import { BadRequestException, Injectable } from '@nestjs/common';
import { UserRepository } from '@/repositories/user.repository';
import { RoleRepository } from '@/repositories/role.repository';

@Injectable()
export class RoleService {
  constructor(
    private readonly roleRepository: RoleRepository,
    private readonly userRepository: UserRepository,
  ) {}

  public async createNewRole(
    roleName: string,
    organizationId: number,
  ): Promise<number> {
    // Insert data into table: Role
    const role = await this.roleRepository.createNewRole(
      organizationId,
      roleName,
    );

    return role.raw.insertId;
  }

  public async changeEmployeeRole(
    organizationId: number,
    roleId: number,
    userId: number,
  ) {
    const relations = ['organization', 'role'];
    const user = await this.userRepository.getUserById(userId, relations);
    if (!user) {
      throw new BadRequestException('Not found user');
    }
    if (user.organization.id !== organizationId) {
      throw new BadRequestException(
        'This user does not belong to this company.',
      );
    }
    await this.userRepository.updateUserRole(user.id, roleId);
  }

  public async update(
    roleId: number,
    roleName: string,
    organizationId: number,
  ) {
    await this.roleRepository.update(organizationId, roleId, roleName);
  }

  public async findAll(organizationId: number) {
    return await this.roleRepository.findAllByOrganizationId(organizationId);
  }

  public async delete(organizationId: number, roleId: number) {
    // Find the user who used this role
    const property = await this.userRepository.findAllByOrganizationIdAndRoleId(
      organizationId,
      roleId,
    );
    // Check if the user who used this role is empty
    if (property.length > 0) {
      throw new BadRequestException(
        'There are still employee using this role.',
      );
    }
    // Delete and return affected column
    return await this.roleRepository.delete(organizationId, roleId);
  }

  public async forceDelete(organizationId: number, roleId: number) {
    // This function removes roles regardless of whether they are active or not.
    // Delete and return affected column
    return await this.roleRepository.delete(organizationId, roleId);
  }
}
