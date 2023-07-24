import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Organization, OrganizationRole, Role, User } from "src/entity";
import { CreateOrganizationDto, UpdateOrganizationDto, DeleteOrganizationDto, GenerateNewPasscodeDto, JoinOrganizationDto, GetOrganizationByIdDto, GetCurrentOrganizationDto } from "src/utils/dtos/organization.dto";
import { Repository } from "typeorm";
import { RoleService } from "./role.service";

@Injectable()
export class OrganizationService {

    constructor(
        private readonly roleService: RoleService,
        @InjectRepository(Organization) private organizationRepository: Repository<Organization>,
        @InjectRepository(User) private userRepository: Repository<User>
      ) {}

    public async getOrganizationById(body: GetOrganizationByIdDto): Promise<Organization>{
        return await this.organizationRepository.findOneBy({ organizationId: body.organizationId })
    }

    public async getCurrentOrganization(body: GetCurrentOrganizationDto): Promise<Organization>{
        const userProperty = await this.userRepository.findOneBy({ userId: body.userId })
        if(!userProperty){
            throw new BadRequestException("User not found")
        }
        if(!userProperty.organizationId){
            throw new BadRequestException("User hasn't joined organization")
        }
        return await this.organizationRepository.findOneBy({ organizationId: userProperty.organizationId }) 
    }

    public async create(body: CreateOrganizationDto){
        // Generate a random passcode
        let passcode = Math.random().toString(36).slice(-8).toUpperCase()
        // Check if this passcode is not exist
        while(await this.organizationRepository.findOneBy({code: passcode}) != null){
            passcode = Math.random().toString(36).slice(-8).toUpperCase()
        }
        // Get current datetime
        const createdTime = new Date()
        // Find expiration time with current time + 30 days
        let date = new Date()
        date.setDate(date.getDate() + 30);
        const expirationTime = date
        // Insert data into database
        const organization = await this.organizationRepository
        .createQueryBuilder()
        .insert()
        .into(Organization)
        .values([{
            organizationName: body.organizatioName,
            code: passcode,
            codeCreatedTime: createdTime,
            codeExpiredTime: expirationTime
        }])
        .execute()
        // Create simple role to new organization
        const roleId: number = await this.roleService.createNewRole("admin",organization.raw.insertId)
        this.roleService.createNewRole("user",organization.raw.insertId)
        // Check if the user account exists or not.
        const property = await this.userRepository.findOneBy({ 
            userId: body.userId 
        })
        if(!property){
            throw new BadRequestException(`Not found user id: ${body.userId}`)
        }
        // Put organization id and role_id to user table with user id
        await this.userRepository.save({
        userId: property.userId,
        organizationId: organization.raw.insertId,
        roleId: roleId
        })
    }

    public async update(body: UpdateOrganizationDto){
        return await this.organizationRepository.save({
            organizationId: body.organizationId,
            organizationName: body.organizatioName
        })
    }

    public async delete(body: DeleteOrganizationDto){
        return await this.organizationRepository.delete({ organizationId: body.organizationId })
    }

    public async join(body: JoinOrganizationDto, passcode: string){
        const organization = await this.organizationRepository.findOneBy({ code: passcode})
        if(!organization){
            throw new BadRequestException("Wrong passcode")
        }
        await this.userRepository.save({
            userId: body.userId,
            organizationId: organization.organizationId
        })
        return organization
    }

    public async generateNewPasscode(body: GenerateNewPasscodeDto): Promise<string>{
        // Generate a random passcode
        let passcode = Math.random().toString(36).slice(-8).toUpperCase()
        // Check if this passcode is not exist
        while(await this.organizationRepository.findOneBy({code: passcode}) != null){
            passcode = Math.floor(Math.random() * (5 - 1 + 1) + 1).toString()
            passcode = Math.random().toString(36).slice(-8).toUpperCase()
        }
        await this.organizationRepository.save({
            organizationId: body.organizationId,
            code: passcode
        })
        return passcode
    }
}