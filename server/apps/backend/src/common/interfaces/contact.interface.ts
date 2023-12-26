import { Contact } from '@/common/entities';
import { DeleteResult, InsertResult, UpdateResult } from 'typeorm';
import {
  CreateNewContactDto,
  UpdateContactDto,
} from '@/common/dto/contact.dto';

type GetContactBy = string | number;

interface ContactInterface {
  findAll(orgnaizationId: number): Promise<Contact[]>;
  getContactBy(key: GetContactBy, withOrg: boolean): Promise<Contact>;
  createNewContact(
    organizationId: number,
    body: CreateNewContactDto,
  ): Promise<InsertResult>;
  createManyContacts(
    organizationId: number,
    bodies: CreateNewContactDto[],
  ): Promise<InsertResult>;
  updateById(
    organizationId: number,
    contactId: number,
    body: UpdateContactDto,
  ): Promise<UpdateResult>;
  deleteById(contactId: number): Promise<DeleteResult>;
}

export { ContactInterface, GetContactBy };
