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
import { Contact, Organization, User } from '@/common/entities';
import * as moment from 'moment-timezone';

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
    return this.contactRepository.findAll(organizationId, null);
  }

  public async findAllByOrgAndName(
    organization: Organization,
    query: string,
  ): Promise<Contact[]> {
    if (!organization) {
      throw new NotFoundException("This user didn't join the organization");
    }

    if (!query) {
      throw new NotFoundException('Query input not found');
    }
    return this.contactRepository.findAll(organization.id, query);
  }

  public async getContactBy(contactId: number) {
    return this.contactRepository.getContactBy(contactId, true);
  }

  public async createNewContact(
    organizationId: number,
    body: CreateNewContactDto,
  ) {
    const organization =
      await this.organizationRepository.getOrganizationByAndWith(
        organizationId,
        ['contacts', 'plan'],
      );

    if (organization.contacts.length >= organization.plan.limitContact) {
      throw new BadRequestException(
        'The quantity limit for this package has been reached',
      );
    }

    const now = moment.tz('Asia/Bangkok').toDate();
    return this.contactRepository.createNewContact(organizationId, {
      ...body,
      createdTime: now,
      modifiedTime: now,
    });
  }

  public async encodeImage(
    organization: Organization,
    contactId: number,
    base64: string,
    file: Express.Multer.File,
  ) {
    if (!base64 && !file) {
      throw new BadRequestException('Image not found');
    }

    if (!organization) {
      throw new NotFoundException('Organization not found');
    }

    const packageKey = organization.packageKey;
    const contact = await this.contactRepository.getContactBy(contactId, true);

    if (!contact || contact.organization.id !== organization.id) {
      throw new NotFoundException(
        'system cannot query contact data for encoding service',
      );
    }

    if (contact.encodedId) {
      await this.recognitionApiService.deleteEncodeImage(
        packageKey,
        contact.encodedId,
      );
    }

    const encodeId = await this.recognitionApiService.encodeImage(
      packageKey,
      file ? file : base64,
      contact,
    );

    const imagePath = await this.uploadService.uploadImageToStorage(
      file,
      'contacts',
      contactId,
    );

    await this.contactRepository.updateById(organization.id, contactId, {
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
    const contactArray: Contact[] = [];
    const accuracyArray: number[] = [];
    const promiseArray: Promise<Contact>[] = [];

    for (const i of resultObj) {
      if (
        i.statusCode == 0 ||
        i.statusCode == -1 ||
        i.statusCode == -2 ||
        i.statusCode == -3 ||
        i.statusCode == -4 ||
        i.statusCode == -5
      ) {
        const object = {
          accuracy: [0.0],
          statusCode: i.statusCode,
        };
        return object;
      }
      promiseArray.push(this.contactRepository.getContactBy(i.id, false));
    }

    const contacts = await Promise.all(promiseArray);

    contacts.forEach((contact, index) => {
      if (contact) {
        contactArray.push(contact);
        accuracyArray.push(resultObj[index].accuracy);
      }
    });

    const object = {
      accuracy: accuracyArray,
      statusCode: 1,
      result: contactArray,
    };
    await this.historyRepository.creaetNewHistory(organization, user, object);
    return object;
  }

  public async deleteContact(organizationId: number, contactId: number) {
    const contact = await this.contactRepository.getContactBy(contactId, true);

    if (!contact) {
      throw new NotFoundException('Contact not found');
    }

    await this.recognitionApiService.deleteEncodeImage(
      contact.organization.packageKey,
      contact.encodedId,
    );

    await this.contactRepository.deleteById(contactId);
  }

  public async getContactsHistoryByOrgAndDate(
    organization: Organization,
    date: string,
  ) {
    if (!organization) {
      throw new NotFoundException("This user didn't joined the organization");
    }
    if (!date) {
      throw new NotFoundException('Date input not found');
    }
    // Date must in format yyyy-mm-dd
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
      throw new BadRequestException('Date format must be YYYY-MM-DD');
    }

    return this.historyRepository.findAllByOrganizationId(
      organization.id,
      date,
    );
  }

  public async importFromCSV(file: Express.Multer.File, user: User) {
    if (!user.organization) {
      throw new NotFoundException("This user didn't join the organization");
    }
    try {
      const filePath = path.join(
        this.folderPath,
        'contact',
        `${user.organization.id}-${file.originalname}`,
      );
      write(filePath, file.buffer);
      const data = await readCSV<CreateNewContactDto>(filePath);
      remove(filePath);
      const haveTemplate = data.some((d) => {
        return d.firstname === 'John' && d.lastname === 'Doe';
      });
      if (haveTemplate) {
        throw new BadRequestException('Data from templates should not be used');
      }

      const filterData = data.filter((d) => d.firstname && d.lastname);

      const organization =
        await this.organizationRepository.getOrganizationByAndWith(
          user.organization.id,
          ['contacts', 'plan'],
        );

      if (
        organization.contacts.length + filterData.length >
        organization.plan.limitContact
      ) {
        throw new BadRequestException(
          'The quantity limit for this package has been reached',
        );
      }

      await this.contactRepository.createManyContacts(
        user.organization.id,
        this.deleteEmptyStringAndAddData(filterData, user),
      );
      return filterData;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  private deleteEmptyStringAndAddData(arr: CreateNewContactDto[], user: User) {
    return arr.map((obj) => {
      for (const key in obj) {
        if (obj.hasOwnProperty(key) && obj[key] === '') {
          obj[key] = undefined;
        }
      }
      const now = moment.tz('Asia/Bangkok').toDate();
      obj.createdTime = now;
      obj.modifiedTime = now;
      obj.owner = `${user.firstname} ${user.lastname.charAt(0).toUpperCase()}.`;
      const date = obj.dob as unknown as string;
      if (/^(0?[1-9]|[12][0-9]|3[01])\/(0?[1-9]|1[0-2])\/\d{4}$/.test(date)) {
        const dateSplit = date.split('/');
        obj.dob = new Date(`${dateSplit[2]}/${dateSplit[1]}/${dateSplit[0]}`);
      }
      return obj;
    });
  }
}
