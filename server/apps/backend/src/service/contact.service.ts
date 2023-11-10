import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateNewContactDto } from '@/utils/dtos/contact.dto';
import { RecognitionService } from '@/service/recognition.service';
import { ContactRepository } from '@/repositories/contact.repository';
import { OrganizationRepository } from '@/repositories/organization.repository';
import { readCSV } from '@/utils/file.manager';
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
    console.log(organizationId, encodedId);
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
  ) {
    const organization = await this.organizationRepository.getOrganizationById(
      organizationId,
    );
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
      base64,
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
  ) {
    console.log('pam pam');
    const organization = await this.organizationRepository.getOrganizationById(
      organizationId,
    );
    const packageKey = organization.packageKey;
    const user = await this.userService.getUserById(userId);
    const resultObj = await this.recognitionApiService.recognitionImage(
      packageKey,
      base64,
    );
    await this.historyRepository.insert(organization, user, resultObj);
    if (!resultObj.id) {
      const object = {
        checkedTime: resultObj.checkedTime,
        accuracy: resultObj.accuracy,
        statusCode: resultObj.statusCode,
      };
      return object;
    }
    console.log(resultObj.id);
    const contact = await this.getContactByEncodedId(
      organizationId,
      resultObj.id,
    );
    if (!contact) {
      const object = {
        checkedTime: resultObj.checkedTime,
        error: "contact's face is conflict",
        accuracy: resultObj.accuracy,
        statusCode: resultObj.statusCode,
      };
      return object;
    }
    const object = {
      checkedTime: resultObj.checkedTime,
      accuracy: resultObj.accuracy,
      statusCode: resultObj.statusCode,
      result: contact,
    };
    return object;
  }

  public async importFromCSV() {
    const filePath = path.join(this.folderPath, 'contact', 'IRIS.csv');
    console.log(filePath);
    return readCSV(filePath);
  }
}
