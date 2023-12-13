import { Role } from '@/common/entities';
import { DeleteResult, InsertResult, UpdateResult } from 'typeorm';

type GetRoleKey = string | number;
type FindAllRoleBy = 'name' | 'organization';

interface RoleInterface {
  findAllBy(key: GetRoleKey, by: FindAllRoleBy): Promise<Role[]>;
  getRoleById(roleId: number): Promise<Role>;
  createNewRole(
    organizationId: number,
    roleName: string,
  ): Promise<InsertResult>;
  updateById(roleId: number, roleName: string): Promise<UpdateResult>;
  deleteById(organizationId: number, roleId: number): Promise<DeleteResult>;
}

export { RoleInterface, FindAllRoleBy, GetRoleKey };
