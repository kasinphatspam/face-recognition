import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Organization, User } from '@/entity';
import {
  CreateOrganizationDto,
  UpdateOrganizationDto,
} from '@/utils/dtos/organization.dto';
import { RoleService } from '@/service/role.service';
import { RecognitionApiService } from '@/service/recognition.api.service';
import { Repository } from 'typeorm';

@Injectable()
export class OrganizationService {
  constructor(
    private readonly recognitionApiService: RecognitionApiService,
    private readonly roleService: RoleService,
    @InjectRepository(Organization)
    private organizationRepository: Repository<Organization>,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  public async getOrganizationById(
    organizationId: number,
  ): Promise<Organization> {
    return await this.organizationRepository.findOneBy({
      id: organizationId,
    });
  }

  public async getCurrentOrganization(userId: number): Promise<Organization> {
    const userProperty = await this.userRepository.findOneBy({
      id: userId,
    });
    if (!userProperty) {
      throw new BadRequestException('User not found');
    }
    if (!userProperty.organization) {
      throw new BadRequestException("User hasn't joined organization");
    }

    return userProperty.organization;
  }

  public async createNewOraganization(
    userId: number,
    body: CreateOrganizationDto,
  ) {
    // Generate a random passcode
    let passcode = Math.random().toString(36).slice(-6).toUpperCase();
    // Check if this passcode is not exist
    while (
      (await this.organizationRepository.findOneBy({ passcode })) != null
    ) {
      passcode = Math.random().toString(36).slice(-6).toUpperCase();
    }
    // Create dataset file on ml-server
    const packageKey = await this.recognitionApiService.createPackage();

    // Get current datetime
    const createdTime = new Date();
    // Insert data into database
    const organization = await this.organizationRepository
      .createQueryBuilder()
      .insert()
      .into(Organization)
      .values([
        {
          name: body.name,
          passcode: passcode,
          codeCreatedTime: createdTime,
          packageKey: packageKey,
        },
      ])
      .execute();
    // Create simple role to new organization
    const roleId: number = await this.roleService.createNewRole(
      'admin',
      organization.raw.insertId,
    );
    this.roleService.createNewRole('user', organization.raw.insertId);
    // Check if the user account exists or not.
    const property = await this.userRepository.findOneBy({
      id: userId,
    });
    if (!property) {
      throw new BadRequestException(`Not found user id: ${userId}`);
    }
    // Put organization id and role_id to user table with user id
    await this.userRepository.save({
      id: property.id,
      organizationId: organization.raw.insertId,
      roleId: roleId,
    });
  }

  public async updateOrganizationInfo(
    organizationId: number,
    body: UpdateOrganizationDto,
  ) {
    return await this.organizationRepository.save({
      id: organizationId,
      name: body.name,
    });
  }

  public async deleteOrganization(organizationId: number) {
    return await this.organizationRepository.delete({
      id: organizationId,
    });
  }

  public async joinOrganizationWithPasscode(userId: number, passcode: string) {
    const organization = await this.organizationRepository.findOneBy({
      passcode,
    });
    if (!organization) {
      throw new BadRequestException('Wrong passcode');
    }
    await this.userRepository
      .createQueryBuilder()
      .update(User)
      .set({ organization })
      .where('id = :userId', { userId })
      .execute();
    return organization;
  }

  public async generateNewPasscode(organizationId: number): Promise<string> {
    // Generate a random passcode
    let passcode = Math.random().toString(36).slice(-6).toUpperCase();
    // Check if this passcode is not exist
    while (
      (await this.organizationRepository.findOneBy({ passcode })) != null
    ) {
      passcode = Math.random().toString(36).slice(-6).toUpperCase();
    }
    await this.organizationRepository.save({
      id: organizationId,
      code: passcode,
    });
    return passcode;
  }
}
