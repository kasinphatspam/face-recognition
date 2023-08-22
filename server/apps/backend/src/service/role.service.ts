import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role, User } from '@/entity';
import { Repository } from 'typeorm';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role) private roleRepository: Repository<Role>,
    @InjectRepository(Role) private userRepository: Repository<User>,
  ) {}

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
          roleName: roleName,
          organizationId: organizationId,
        },
      ])
      .execute();

    return role.raw.insertId;
  }

  public async editRole(
    roleId: number,
    roleName: string,
    organizationId: number,
  ) {
    await this.roleRepository
      .createQueryBuilder()
      .update(Role)
      .set({ roleName: roleName })
      .where('roleId = :id', { id: roleId })
      .execute();
  }

  public async getAllRole(organizationId: number) {
    await this.roleRepository.find({
      where: { organizationId: organizationId },
    });
  }

  public async deleteRole(organizationId: number, roleId: number) {
    const property = await this.userRepository.find({
      where: { organizationId: organizationId, roleId: roleId },
    });

    if (property != null) {
      throw new BadRequestException(
        'There are still employee using this role.',
      );
    }
    return await this.roleRepository.delete({
      roleId: roleId,
      organizationId: organizationId,
    });
  }
}
