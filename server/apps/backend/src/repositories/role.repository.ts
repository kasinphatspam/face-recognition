import { connection } from '@/connection';
import { Role } from '@/entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class RoleRepository {
  public async getRoleById(roleId: number) {
    return await connection.getRepository(Role).findOneBy({ id: roleId });
  }

  public async getAllRoleInOrganization(organizationId: number) {
    return await connection.getRepository(Role).find({
      where: { organization: { id: organizationId } },
    });
  }
  public async createNewRole(organizationId: number, roleName: string) {
    return await connection
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

  public async updateRoleInformation(
    organizationId: number,
    roleId: number,
    roleName: string,
  ) {
    return await connection
      .getRepository(Role)
      .update(
        { id: roleId, organization: { id: organizationId } },
        { name: roleName },
      );
  }

  public async deleteRole(organizationId: number, roleId: number) {
    return await connection
      .getRepository(Role)
      .delete({ id: roleId, organization: { id: organizationId } });
  }
}
