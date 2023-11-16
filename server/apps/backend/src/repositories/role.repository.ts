import { connection } from '@/utils/connection';
import { Role } from '@/entity';
import { Injectable } from '@nestjs/common';

/**
 * RoleRepository
 * This class is responsible for interacting with a MySQL database using TypeORM.
 * It provides methods for retrieving and managing roles.
 */
@Injectable()
export class RoleRepository {
  /**
   * Retrieve a role by its ID.
   * @param roleId - The ID of the role to retrieve.
   * @returns A promise that resolves to a Role entity.
   */
  public async getRoleById(roleId: number) {
    return connection.getRepository(Role).findOneBy({ id: roleId });
  }

  /**
   * Retrieve all roles associated with a specific organization.
   * @param organizationId - The ID of the organization.
   * @returns A promise that resolves to an array of Role entities.
   */
  public async findAllByOrganizationId(organizationId: number) {
    return connection.getRepository(Role).find({
      where: { organization: { id: organizationId } },
    });
  }

  /**
   * Create a new role for a specific organization.
   * @param organizationId - The ID of the organization.
   * @param roleName - The name of the new role.
   * @returns A promise that resolves once the role is created.
   */
  public async createNewRole(organizationId: number, roleName: string) {
    return connection
      .getRepository(Role)
      .createQueryBuilder()
      .insert()
      .into(Role)
      .values([
        {
          name: roleName,
          organization: { id: organizationId },
        },
      ])
      .execute();
  }

  /**
   * Update a role's information.
   * @param organizationId - The ID of the organization to which the role belongs.
   * @param roleId - The ID of the role to update.
   * @param roleName - The new name for the role.
   * @returns A promise that resolves once the role is updated.
   */
  public async update(
    organizationId: number,
    roleId: number,
    roleName: string,
  ) {
    return connection
      .getRepository(Role)
      .update(
        { id: roleId, organization: { id: organizationId } },
        { name: roleName },
      );
  }

  /**
   * Delete a role by its ID and organization ID.
   * @param organizationId - The ID of the organization to which the role belongs.
   * @param roleId - The ID of the role to delete.
   * @returns A promise that resolves once the role is deleted.
   */
  public async delete(organizationId: number, roleId: number) {
    return connection
      .getRepository(Role)
      .delete({ id: roleId, organization: { id: organizationId } });
  }
}
