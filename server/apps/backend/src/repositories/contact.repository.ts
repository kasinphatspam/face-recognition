import { connection } from '@/utils/connection';
import { Contact } from '@/entity';
import { CreateNewContactDto } from '@/utils/dtos/contact.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ContactRepository {
  public async getContactById(
    organizationId: number,
    contactId: number,
  ): Promise<Contact> {
    return connection.getRepository(Contact).findOne({
      relations: ['organization'],
      where: [{ id: contactId, organization: { id: organizationId } }],
    });
  }

  public async getContactByEncodedId(
    organizationId: number,
    encodedId: string,
  ): Promise<Contact> {
    return connection.getRepository(Contact).findOne({
      relations: ['organization'],
      where: [{ encodedId: encodedId, organization: { id: organizationId } }],
    });
  }

  public async findAllByOrganizationId(orgnaizationId: number) {
    return connection.getRepository(Contact).find({
      where: [{ organization: { id: orgnaizationId } }],
    });
  }

  public async createNewContact(
    organizationId: number,
    body: CreateNewContactDto,
  ) {
    return connection
      .getRepository(Contact)
      .createQueryBuilder()
      .insert()
      .into(Contact)
      .values([
        {
          organization: { id: organizationId },
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
  }

  public async updateContactEncodeId(
    organizationId: number,
    contactId: number,
    encodedId: string,
  ) {
    return connection
      .getRepository(Contact)
      .update(
        { id: contactId, organization: { id: organizationId } },
        { encodedId: encodedId },
      );
  }
}
