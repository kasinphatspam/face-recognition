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
          name: roleName,
          organization: { id: organizationId },
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
      .set({ name: roleName })
      .where('id = :id', { id: roleId })
      .execute();
  }

  public async getAllRole(organizationId: number) {
    await this.roleRepository.find({
      where: { organization: { id: organizationId } },
    });
  }

  public async deleteRole(organizationId: number, roleId: number) {
    const property = await this.userRepository.find({
      where: { id: organizationId, role: { id: roleId } },
    });

    if (property != null) {
      throw new BadRequestException(
        'There are still employee using this role.',
      );
    }
    return await this.roleRepository.delete({
      id: roleId,
      organization: { id: organizationId },
    });
  }
}
