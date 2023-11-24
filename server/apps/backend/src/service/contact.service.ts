import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateNewContactDto } from '@/utils/dtos/contact.dto';
import { RecognitionService } from '@/service/recognition.service';
import { ContactRepository } from '@/repositories/contact.repository';
import { OrganizationRepository } from '@/repositories/organization.repository';
import { readCSV, write, remove } from '@/utils/file.manager';
import * as path from 'path';
import { HistoryRepository } from '@/repositories/history.repository';
import { UserService } from './user.service';

@Injectable()
export class ContactService {
  constructor(
    private readonly userService: UserService,
    private readonly contactRepository: ContactRepository,
    private readonly organizationRepository: OrganizationRepository,
    private readonly historyRepository: HistoryRepository,
    private readonly recognitionApiService: RecognitionService,
  ) {}

  public readonly folderPath = path.join(__dirname, '../../images');

  public async createNewContact(
    organizationId: number,
    body: CreateNewContactDto,
  ): Promise<number> {
    const contact = await this.contactRepository.createNewContact(
      organizationId,
      body,
    );
    return contact.raw.insertId;
  }

  public async getContactById(organizationId: number, contactId: number) {
    return this.contactRepository.getContactById(organizationId, contactId);
  }

  public async getContactByEncodedId(
    organizationId: number,
    encodedId: string,
  ) {
    return this.contactRepository.getContactByEncodedId(
      organizationId,
      encodedId,
    );
  }

  public async getAllContact(orgnaizationId: number) {
    return this.contactRepository.findAllByOrganizationId(orgnaizationId);
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

    const organization = await this.organizationRepository.getOrganizationById(
      organizationId,
    );

    if (!organization) {
      throw new NotFoundException('Organization not found');
    }

    const packageKey = organization.packageKey;
    const contactProperty = await this.getContactById(
      organization.id,
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
    await this.contactRepository.updateContactEncodeId(
      organizationId,
      contactId,
      encodeId,
    );
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

    const organization = await this.organizationRepository.getOrganizationById(
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

      const contact = await this.getContactByEncodedId(organizationId, i.id);

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
    const contact = await this.contactRepository.getContactById(
      organizationId,
      contactId,
    );

    if (!contact) {
      throw new NotFoundException('Contact not found');
    }

    await this.recognitionApiService.deleteEncodeImage(
      contact.organization.packageKey,
      contact.encodedId,
    );

    await this.contactRepository.deleteContactById(contactId);
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
