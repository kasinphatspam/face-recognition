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
    const user = await this.userRepository.getUserByIdAndOrganizationId(
      userId,
      organizationId,
    );
    if (!user) {
      throw new BadRequestException('Not found user');
    }
    await this.userRepository.updateUserRole(user.id, roleId);
  }

  public async editRole(
    roleId: number,
    roleName: string,
    organizationId: number,
  ) {
    await this.roleRepository.updateRoleInformation(
      organizationId,
      roleId,
      roleName,
    );
  }

  public async getAllRole(organizationId: number) {
    return await this.roleRepository.getAllRoleInOrganization(organizationId);
  }

  public async deleteRole(organizationId: number, roleId: number) {
    // Find the user who used this role
    const property = await this.userRepository.getAllUserByRoleAndOrganization(
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
    return await this.roleRepository.deleteRole(organizationId, roleId);
  }

  public async forceDeleteRole(organizationId: number, roleId: number) {
    // This function removes roles regardless of whether they are active or not.
    // Delete and return affected column
    return await this.roleRepository.deleteRole(organizationId, roleId);
  }
}
