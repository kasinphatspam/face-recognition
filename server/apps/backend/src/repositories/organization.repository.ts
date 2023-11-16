import { connection } from '@/utils/connection';
import { Organization, Plan } from '@/entity';
import { UpdateOrganizationDto } from '@/utils/dtos/organization.dto';
import { Injectable } from '@nestjs/common';
import { InsertResult } from 'typeorm';

/**
 * OrganizationRepository
 * This class is responsible for interacting with a MySQL database using TypeORM.
 * It provides methods for retrieving, creating, updating, and deleting organizations.
 */
@Injectable()
export class OrganizationRepository {
  /**
   * Default methods adhering to the policy; should only be called from their respective services.
   * IMPORTANT: Avoid direct calls to these methods from outside the repository.
   */

  /**
   * Retrieve all organizations from the database.
   * @returns A promise that resolves to an array of Organization entities.
   */
  public async findAll() {
    return await connection.getRepository(Organization).find();
  }

  /**
   * Retrieve an organization by its ID.
   * @param organizationId - The ID of the organization to retrieve.
   * @returns A promise that resolves to an Organization entity.
   */
  public async getOrganizationById(
    organizationId: number,
  ): Promise<Organization> {
    return connection.getRepository(Organization).findOneBy({
      id: organizationId,
    });
  }

  /**
   * Create a new organization.
   * @param name - The name of the organization.
   * @param passcode - The passcode for the organization.
   * @param date - The date the code was created.
   * @param packageKey - The package key for the organization.
   * @param plan - The plan associated with the organization.
   * @returns A promise that resolves once the organization is created.
   */
  public async createNewOrganization(
    name: string,
    passcode: string,
    date: Date,
    packageKey: string,
    plan: Plan,
  ): Promise<InsertResult> {
    return connection
      .getRepository(Organization)
      .createQueryBuilder()
      .insert()
      .into(Organization)
      .values([
        {
          name: name,
          passcode: passcode,
          codeCreatedTime: date,
          packageKey: packageKey,
          plan: plan,
        },
      ])
      .execute();
  }

  /**
   * Update an organization by its ID.
   * @param organizationId - The ID of the organization to update.
   * @param body - The data to update in the organization entity.
   * @returns A promise that resolves once the organization is updated.
   */
  public async update(organizationId: number, body: UpdateOrganizationDto) {
    return connection.getRepository(Organization).save({
      id: organizationId,
      name: body.name,
      passcode: body.passcode,
      codeCreatedTime: body.codeCreatedTime,
      vtigerToken: body.vtigerToken,
      vtigerAccessKey: body.vtigerAccessKey,
      vtigerLink: body.vtigerLink,
      packageKey: body.packageKey,
      isPublic: body.isPublic,
    });
  }

  /**
   * Delete an organization by its ID.
   * @param organizationId - The ID of the organization to delete.
   * @returns A promise that resolves once the organization is deleted.
   */
  public async delete(organizationId: number) {
    return connection.getRepository(Organization).delete({
      id: organizationId,
    });
  }

  /**
   * Customized methods adhering to the policy; can be called directly.
   * IMPORTANT: No need to import this repository; use these methods directly.
   */

  /**
   * Retrieve an organization by its passcode.
   * @param passcode - The passcode to search for.
   * @returns A promise that resolves to an Organization entity.
   */
  public async getOrganizationByPasscode(passcode: string) {
    return connection.getRepository(Organization).findOneBy({
      passcode: passcode,
    });
  }
}
