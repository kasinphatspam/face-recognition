import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { OrganizationRole, Role } from "src/entity";
import { Repository } from "typeorm";

@Injectable()
export class RoleService {
    constructor(
        @InjectRepository(OrganizationRole) private organizationRoleRepository: Repository<OrganizationRole>,
        @InjectRepository(Role) private roleRepository: Repository<Role>,
    ) { }

    public async createNewRole(roleName: string, organizationId: number): Promise<number> {
        // Insert data into table: Role
        const role = await this.roleRepository
            .createQueryBuilder()
            .insert()
            .into(Role)
            .values([{
                roleName: roleName
            }])
            .execute()
        // Insert data into table: OrganizationRole
        await this.organizationRoleRepository
            .createQueryBuilder()
            .insert()
            .into(OrganizationRole)
            .values([{
                organizationId: organizationId,
                roleId: role.raw.insertId
            }])
            .execute()
        return role.raw.insertId
    }

    public async editRole(roleName: string, organizationId: number){

    }
}