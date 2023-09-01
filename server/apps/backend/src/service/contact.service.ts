import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Contact, Organization } from '@/entity';
import { CreateNewContactDto } from '@/utils/dtos/contact.dto';
import { Repository } from 'typeorm';
import { RecognitionApiService } from '@/service/recognition.api.service';

@Injectable()
export class ContactService {
  constructor(
    private readonly recognitionApiService: RecognitionApiService,
    @InjectRepository(Contact) private contactRepository: Repository<Contact>,
    @InjectRepository(Organization)
    private organizationRepository: Repository<Organization>,
  ) {}

  public async createNewContact(
    organizationId: number,
    body: CreateNewContactDto,
  ) {
    const contact = await this.contactRepository
      .createQueryBuilder()
      .insert()
      .into(Contact)
      .values([
        {
          organization: {id: organizationId},
          firstname: body.firstname,
          lastname: body.lastname,
          contactCompany: body.contactCompany,
          title: body.title,
          officePhone: body.officePhone,
          mobile: body.mobile,
          email1: body.email1,
          email2: body.email2,
          dob: body.dob,
          contactOwner: body.contactOwner,
          createdTime: body.createdTime,
          modifiedTime: body.modifiedTime,
          lineId: body.lineId,
          facebook: body.facebook,
          linkedin: body.linkedin,
        },
      ])
      .execute();
    return contact.raw.insertId;
  }

  public async getContactById(organizationId: number, contactId: number) {
    return await this.contactRepository.findOneBy({
      id: contactId,
      organization: { id: organizationId },
    });
  }

  public async getAllContact(id: number) {
    return await this.contactRepository.find({
      where: [{ organization: { id } }],
    });
  }

  public async encodeImage(
    organizationId: number,
    contactId: number,
    base64: string,
  ) {
    const packageKey = (
      await this.organizationRepository.findOneBy({
        id: organizationId,
      })
    ).packageKey;
    const encodeId = await this.recognitionApiService.encodeImage(
      packageKey,
      base64,
      organizationId,
      contactId
    );
    await this.contactRepository
      .createQueryBuilder()
      .update(Contact)
      .set({ encodedId: encodeId })
      .where('organizationId = :organizationId AND contactId = :contactId', {
        organizationId: organizationId,
        contactId: contactId,
      })
      .execute();
    return encodeId;
  }

  public async recognitionImage(organizationId: number, base64: string) {
    const packageKey = (
      await this.organizationRepository.findOneBy({
        id: organizationId,
      })
    ).packageKey;
    const resultObj = await this.recognitionApiService.recognitionImage(
      packageKey,
      base64,
    );
    const contact = await this.contactRepository.findOneBy({
      encodedId: resultObj.id,
      id: organizationId,
    });
    const object = {
      checkedTime: resultObj.checkedTime,
      accuracy: resultObj.accuracy,
      statusCode: resultObj.statusCode,
      result: contact,
    };
    return object;
  }
}
