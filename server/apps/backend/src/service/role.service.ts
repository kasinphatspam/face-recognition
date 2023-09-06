import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role, User } from '@/entity';
import { Repository } from 'typeorm';
import { OrganizationService } from './organization.service';
import { UserService } from './user.service';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role) private roleRepository: Repository<Role>,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) { }

  public async createNewRole(
    roleName: string,
    organizationId: number,
  ): Promise<number> {
    // Insert data into table: Role
    const role = await this.roleRepository
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

    return role.raw.insertId;
  }

  public async changeEmployeeRole(organizationId: number, roleId: number, userId: number) {
    const user = await this.userRepository.findOne({
      relations: ['organization'],
      where: { id: userId, organization: { id: organizationId } }
    })
    if (!user) {
      throw new BadRequestException("Not found user")
    }
    return await this.userRepository.update({ 
      id: userId, organization: { id: user.organization.id } }, 
      { role: { id: roleId } });
  }

  public async editRole(
    roleId: number,
    roleName: string,
    organizationId: number,
  ) {
    await this.roleRepository.update({ id: roleId, organization: { id: organizationId } }, { name: roleName })
  }

  public async getAllRole(organizationId: number) {
    return await this.roleRepository.find({
      where: { organization: { id: organizationId } },
    });
  }

  public async deleteRole(organizationId: number, roleId: number) {
    // Find the user who used this role
    const property = await this.userRepository.find({
      relations: ['organization', 'role'],
      where: [{
        organization: { id: organizationId },
        role: { id: roleId }
      }]
    })
    // Check if the user who used this role is empty
    if (property.length > 0) {
      throw new BadRequestException(
        'There are still employee using this role.',
      );
    }
    // Delete and return affected column
    return await this.roleRepository.delete({
      id: roleId,
      organization: { id: organizationId },
    });
  }

  public async forceDeleteRole(organizationId: number, roleId: number) {
    // This function removes roles regardless of whether they are active or not.
    // Delete and return affected column
    return await this.roleRepository.delete({
      id: roleId,
      organization: { id: organizationId },
    });
  }
}
