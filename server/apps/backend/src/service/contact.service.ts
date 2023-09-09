import { Injectable } from '@nestjs/common';
import { CreateNewContactDto } from '@/utils/dtos/contact.dto';
import { RecognitionApiService } from '@/service/recognition.api.service';
import { ContactRepository } from '@/repositories/contact.repository';
import { OrganizationRepository } from '@/repositories/organization.repository';

@Injectable()
export class ContactService {
  constructor(
    private readonly recognitionApiService: RecognitionApiService,
    private readonly contactRepository: ContactRepository,
    private readonly organizationRepository: OrganizationRepository,
  ) {}

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
    return await this.contactRepository.getContactById(
      organizationId,
      contactId,
    );
  }

  public async getAllContact(orgnaizationId: number) {
    return await this.contactRepository.getAllContactInOrganization(
      orgnaizationId,
    );
  }

  public async encodeImage(
    organizationId: number,
    contactId: number,
    base64: string,
  ) {
    const packageKey = (
      await this.organizationRepository.getOrganizationById(organizationId)
    ).packageKey;
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

  public async recognitionImage(organizationId: number, base64: string) {
    const packageKey = (
      await this.organizationRepository.getOrganizationById(organizationId)
    ).packageKey;
    const resultObj = await this.recognitionApiService.recognitionImage(
      packageKey,
      base64,
    );
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
}
