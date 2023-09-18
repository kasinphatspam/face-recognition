import { connection } from '@/utils/connection';
import { Role } from '@/entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class RoleRepository {
  public async getRoleById(roleId: number) {
    return connection.getRepository(Role).findOneBy({ id: roleId });
  }

  public async findAllByOrganizationId(organizationId: number) {
    return connection.getRepository(Role).find({
      where: { organization: { id: organizationId } },
    });
  }

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

  public async delete(organizationId: number, roleId: number) {
    return connection
      .getRepository(Role)
      .delete({ id: roleId, organization: { id: organizationId } });
  }
}
