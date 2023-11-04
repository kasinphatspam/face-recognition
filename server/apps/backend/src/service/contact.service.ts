import { Injectable } from '@nestjs/common';
import { CreateNewContactDto } from '@/utils/dtos/contact.dto';
import { RecognitionApiService } from '@/service/recognition.api.service';
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
    private readonly recognitionApiService: RecognitionApiService,
    private readonly contactRepository: ContactRepository,
    private readonly organizationRepository: OrganizationRepository,
    private readonly historyRepository: HistoryRepository,
  ) {}

  public readonly folderPath = path.join(__dirname, '../../images');

  public async createNewContact(
    organizationId: number,
    body: CreateNewContactDto,
  ) {
    const contact = await this.contactRepository.createNewContact(
      organizationId,
      body,
    );
    return contact.raw.insertId;
  }

  public async getContactById(organizationId: number, contactId: number) {
    return this.contactRepository.getContactById(organizationId, contactId);
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
    const encodeId = await this.recognitionApiService.encodeImage(
      packageKey,
      base64,
      organizationId,
      contactId,
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
    userId,
    base64: string,
  ) {
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
    const contact = await this.contactRepository.getContactByEncodedId(
      organizationId,
      resultObj.id,
    );
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
