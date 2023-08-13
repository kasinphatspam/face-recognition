import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Role } from "src/entity";
import { Repository } from "typeorm";

@Injectable()
export class RoleService {
    constructor(
        @InjectRepository(Role) private roleRepository: Repository<Role>
    ) { }

    public async createNewRole(roleName: string, organizationId: number): Promise<number> {
        // Insert data into table: Role
        const role = await this.roleRepository
            .createQueryBuilder()
            .insert()
            .into(Role)
            .values([{
                roleName: roleName,
                organizationId: organizationId
            }])
            .execute()

        return role.raw.insertId
    }

    public async editRole(roleId: number, roleName: string, organizationId: number) {
        await this.roleRepository
            .createQueryBuilder()
            .update(Role)
            .set({ roleName: roleName })
            .where('roleId = :id', { id: roleId })
            .execute()
    }

    public async getAllRole(organizationId: number) {
        await this.roleRepository
            .find({ where: { organizationId: organizationId } })
    }
}