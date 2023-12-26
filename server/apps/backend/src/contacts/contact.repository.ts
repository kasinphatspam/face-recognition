import { connection } from '@/common/helpers/connection.helper';
import { Contact } from '@/common/entities';
import {
  CreateNewContactDto,
  UpdateContactDto,
} from '@/common/dto/contact.dto';
import { Injectable } from '@nestjs/common';
import { DeleteResult, InsertResult, Repository, UpdateResult } from 'typeorm';
import {
  ContactInterface,
  GetContactBy,
} from '@/common/interfaces/contact.interface';

@Injectable()
export class ContactRepository
  extends Repository<Contact>
  implements ContactInterface
{
  constructor() {
    super(Contact, connection.createEntityManager());
  }

  public async getContactBy(
    key: GetContactBy,
    withOrg: boolean,
  ): Promise<Contact> {
    if (typeof key === 'number') {
      return this.findOne({
        relations: withOrg ? ['organization'] : null,
        where: { id: key as number },
      });
    }
    return this.findOne({
      relations: withOrg ? ['organization'] : null,
      where: { encodedId: key as string },
    });
  }

  public async findAll(orgnaizationId: number): Promise<Contact[]> {
    return this.find({ where: { organization: { id: orgnaizationId } } });
  }

  public async createNewContact(
    organizationId: number,
    body: CreateNewContactDto,
  ): Promise<InsertResult> {
    return this.createQueryBuilder()
      .insert()
      .into(Contact)
      .values([
        {
          ...body,
          organization: { id: organizationId },
        },
      ])
      .execute();
  }

  public async createManyContacts(
    organizationId: number,
    bodies: CreateNewContactDto[],
  ): Promise<InsertResult> {
    return this.createQueryBuilder()
      .insert()
      .into(Contact)
      .values(
        bodies.map((body) => {
          return {
            ...body,
            organization: { id: organizationId },
          };
        }),
      )
      .execute();
  }

  public async updateById(
    organizationId: number,
    contactId: number,
    body: UpdateContactDto,
  ): Promise<UpdateResult> {
    return this.update(
      { id: contactId, organization: { id: organizationId } },
      { ...body },
    );
  }

  public async deleteById(contactId: number): Promise<DeleteResult> {
    return this.delete({ id: contactId });
  }
}
