import { connection } from '@/utils/connection';
import { Contact } from '@/entity';
import { CreateNewContactDto } from '@/utils/dtos/contact.dto';
import { Injectable } from '@nestjs/common';

/**
 * ContactRepository
 * This class is responsible for interacting with a MySQL database using TypeORM.
 * It provides methods for retrieving, creating, and updating contacts.
 */
@Injectable()
export class ContactRepository {
  /**
   * Retrieve a contact by its ID and organization ID.
   * @param organizationId - The ID of the organization to which the contact belongs.
   * @param contactId - The ID of the contact to retrieve.
   * @returns A promise that resolves to a Contact entity with organization relations.
   */
  public async getContactById(
    organizationId: number,
    contactId: number,
  ): Promise<Contact> {
    return connection.getRepository(Contact).findOne({
      relations: ['organization'],
      where: [{ id: contactId, organization: { id: organizationId } }],
    });
  }

  /**
   * Retrieve a contact by its encoded ID and organization ID.
   * @param organizationId - The ID of the organization to which the contact belongs.
   * @param encodedId - The encoded ID of the contact to retrieve.
   * @returns A promise that resolves to a Contact entity with organization relations.
   */
  public async getContactByEncodedId(
    organizationId: number,
    encodedId: string,
  ): Promise<Contact> {
    return connection.getRepository(Contact).findOne({
      relations: ['organization'],
      where: [{ encodedId: encodedId, organization: { id: organizationId } }],
    });
  }

  /**
   * Retrieve all contacts associated with a specific organization.
   * @param organizationId - The ID of the organization.
   * @returns A promise that resolves to an array of Contact entities.
   */
  public async findAllByOrganizationId(orgnaizationId: number) {
    return connection.getRepository(Contact).find({
      where: [{ organization: { id: orgnaizationId } }],
    });
  }

  /**
   * Create a new contact for a specific organization.
   * @param organizationId - The ID of the organization.
   * @param body - The data for the new contact.
   * @returns A promise that resolves once the contact is created.
   */
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
          ...body,
          organization: { id: organizationId },
        },
      ])
      .execute();
  }

  /**
   * Create many new contacts for a specific organization.
   * @param organizationId - The ID of the organization.
   * @param bodies - The datas for the new contacts.
   * @returns A promise that resolves once the contact is created.
   */
  public async createManyContacts(
    organizationId: number,
    bodies: CreateNewContactDto[],
  ) {
    return connection
      .createQueryBuilder()
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

  /**
   * Update the encoded ID of a contact.
   * @param organizationId - The ID of the organization to which the contact belongs.
   * @param contactId - The ID of the contact to update.
   * @param encodedId - The new encoded ID for the contact.
   * @returns A promise that resolves once the contact's encoded ID is updated.
   */
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

  public async deleteContactById(contactId: number) {
    return connection.getRepository(Contact).delete({ id: contactId });
  }
}
