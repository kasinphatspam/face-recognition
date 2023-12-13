import { connection } from '@/common/helpers/connection.helper';
import { Role } from '@/common/entities';
import { Injectable } from '@nestjs/common';
import { DeleteResult, InsertResult, Repository, UpdateResult } from 'typeorm';
import {
  FindAllRoleBy,
  RoleInterface,
} from '../common/interfaces/role.interface';

@Injectable()
export class RoleRepository extends Repository<Role> implements RoleInterface {
  constructor() {
    super(Role, connection.createEntityManager());
  }
  public async getRoleById(roleId: number): Promise<Role> {
    return this.findOne({ where: { id: roleId } });
  }
  public async findAllBy(
    key: number | string,
    by: FindAllRoleBy,
  ): Promise<Role[]> {
    if (by === 'name' && typeof key === 'string') {
      return this.find({ where: { name: key as string } });
    } else if (by === 'organization' && typeof key === 'number') {
      return this.find({ where: { organization: { id: key } } });
    } else {
      throw new Error('Wrong parameter passing');
    }
  }
  public async createNewRole(
    organizationId: number,
    roleName: string,
  ): Promise<InsertResult> {
    return this.createQueryBuilder()
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

  public async updateById(
    roleId: number,
    roleName: string,
  ): Promise<UpdateResult> {
    return this.update({ id: roleId }, { name: roleName });
  }
  public async deleteById(roleId: number): Promise<DeleteResult> {
    return this.delete({ id: roleId });
  }
}
