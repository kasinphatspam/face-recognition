import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateNewContactDto } from '@/common/dto/contact.dto';
import { RecognitionService } from '@/contacts/recognition.service';
import { ContactRepository } from '@/contacts/contact.repository';
import { OrganizationRepository } from '@/organizations/repositories/organization.repository';
import { readCSV, write, remove } from '@/common/helpers/file.helper';
import * as path from 'path';
import { HistoryRepository } from '@/organizations/repositories/history.repository';
import { UserService } from '@/users/user.service';
import { UploadService } from '@/common/services/upload.service';

@Injectable()
export class ContactService {
  constructor(
    private readonly userService: UserService,
    private readonly contactRepository: ContactRepository,
    private readonly organizationRepository: OrganizationRepository,
    private readonly historyRepository: HistoryRepository,
    private readonly recognitionApiService: RecognitionService,
    private readonly uploadService: UploadService,
  ) {}

  public readonly folderPath = path.join(__dirname, '../../images');

  public async findAll(organizationId: number) {
    if (!organizationId) throw new BadRequestException('Missing parameter');
    return this.contactRepository.findAll(organizationId);
  }

  public async getContactBy(contactId: number) {
    return this.contactRepository.getContactBy(contactId);
  }

  public async createNewContact(
    organizationId: number,
    body: CreateNewContactDto,
  ) {
    return this.contactRepository.createNewContact(organizationId, body);
  }

  public async encodeImage(
    organizationId: number,
    contactId: number,
    base64: string,
    file: Express.Multer.File,
  ) {
    if (!base64 && !file) {
      throw new BadRequestException('Image not found');
    }

    const organization = await this.organizationRepository.getOrganizationBy(
      organizationId,
    );

    if (!organization) {
      throw new NotFoundException('Organization not found');
    }

    const packageKey = organization.packageKey;
    const contactProperty = await this.contactRepository.getContactBy(
      contactId,
    );

    if (!contactProperty) {
      throw new NotFoundException(
        'system cannot query contact data for encoding service',
      );
    }

    const encodeId = await this.recognitionApiService.encodeImage(
      packageKey,
      file ? file : base64,
      contactProperty,
    );

    const imagePath = await this.uploadService.uploadImageToStorage(
      file,
      'contacts',
      contactId,
    );

    await this.contactRepository.updateById(organizationId, contactId, {
      encodedId: encodeId,
      image: imagePath,
    });

    return encodeId;
  }

  public async recognitionImage(
    organizationId: number,
    userId: number,
    base64: string,
    file: Express.Multer.File,
  ) {
    if (!base64 && !file) {
      throw new BadRequestException('Image not found');
    }

    const organization = await this.organizationRepository.getOrganizationBy(
      organizationId,
    );

    if (!organization) {
      throw new NotFoundException('Organization not found');
    }

    const packageKey = organization.packageKey;
    const user = await this.userService.getUserBy(userId, null);
    const resultObj = await this.recognitionApiService.recognitionImage(
      packageKey,
      file ? file : base64,
    );
    await this.historyRepository.insert(organization, user, resultObj[0]);
    const contactArray = [];
    const accuracyArray = [];

    for (const i of resultObj) {
      if (i.statusCode == 0 || i.statusCode == -1) {
        const object = {
          accuracy: [0.0],
          statusCode: i.statusCode,
        };
        return object;
      }

      const contact = await this.contactRepository.getContactBy(i.id);

      if (contact) {
        contactArray.push(contact);
        accuracyArray.push(i.accuracy);
      }
    }
    const object = {
      accuracy: accuracyArray,
      statusCode: 1,
      result: contactArray,
    };
    console.log(object);
    return object;
  }

  public async deleteContact(organizationId: number, contactId: number) {
    const contact = await this.contactRepository.getContactBy(contactId);

    if (!contact) {
      throw new NotFoundException('Contact not found');
    }

    await this.recognitionApiService.deleteEncodeImage(
      contact.organization.packageKey,
      contact.encodedId,
    );

    await this.contactRepository.deleteById(contactId);
  }

  public async importFromCSV(
    file: Express.Multer.File,
    organizationId: number,
  ) {
    const filePath = path.join(
      this.folderPath,
      'contact',
      `${organizationId}-${file.originalname}`,
    );
    write(filePath, file.buffer);
    const data = await readCSV<CreateNewContactDto>(filePath);
    remove(filePath);
    await this.contactRepository.createManyContacts(organizationId, data);
    return data;
  }
}
