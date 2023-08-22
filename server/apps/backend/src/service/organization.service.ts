import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Organization, Role, User } from 'src/entity';
import {
  CreateOrganizationDto,
  UpdateOrganizationDto,
} from 'src/utils/dtos/organization.dto';
import { Repository } from 'typeorm';
import { RoleService } from './role.service';
import { RecognitionApiService } from './recognition.api.service';

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
      organizationId: organizationId,
    });
  }

  public async getCurrentOrganization(userId: number): Promise<Organization> {
    const userProperty = await this.userRepository.findOneBy({
      userId: userId,
    });
    if (!userProperty) {
      throw new BadRequestException('User not found');
    }
    if (!userProperty.organizationId) {
      throw new BadRequestException("User hasn't joined organization");
    }
    return await this.organizationRepository.findOneBy({
      organizationId: userProperty.organizationId,
    });
  }

  public async createNewOraganization(
    userId: number,
    body: CreateOrganizationDto,
  ) {
    // Generate a random passcode
    let passcode = Math.random().toString(36).slice(-6).toUpperCase();
    // Check if this passcode is not exist
    while (
      (await this.organizationRepository.findOneBy({ code: passcode })) != null
    ) {
      passcode = Math.random().toString(36).slice(-6).toUpperCase();
    }
    // Create dataset file on ml-server
    const packageKey = await this.recognitionApiService.createPackage();

    // Get current datetime
    const createdTime = new Date();
    // Find expiration time with current time + 30 days
    let date = new Date();
    date.setDate(date.getDate() + 30);
    const expirationTime = date;
    // Insert data into database
    const organization = await this.organizationRepository
      .createQueryBuilder()
      .insert()
      .into(Organization)
      .values([
        {
          organizationName: body.organizationName,
          code: passcode,
          codeCreatedTime: createdTime,
          codeExpiredTime: expirationTime,
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
      userId: userId,
    });
    if (!property) {
      throw new BadRequestException(`Not found user id: ${userId}`);
    }
    // Put organization id and role_id to user table with user id
    await this.userRepository.save({
      userId: property.userId,
      organizationId: organization.raw.insertId,
      roleId: roleId,
    });
  }

  public async updateOrganizationInfo(
    organizationId: number,
    body: UpdateOrganizationDto,
  ) {
    return await this.organizationRepository.save({
      organizationId: organizationId,
      organizationName: body.organizatioName,
    });
  }

  public async deleteOrganization(organizationId: number) {
    return await this.organizationRepository.delete({
      organizationId: organizationId,
    });
  }

  public async joinOrganizationWithPasscode(userId: number, passcode: string) {
    const organization = await this.organizationRepository.findOneBy({
      code: passcode,
    });
    if (!organization) {
      throw new BadRequestException('Wrong passcode');
    }
    await this.userRepository
      .createQueryBuilder()
      .update(User)
      .set({ organizationId: organization.organizationId })
      .where('userId = :userId', { userId })
      .execute();
    return organization;
  }

  public async generateNewPasscode(organizationId: number): Promise<string> {
    // Generate a random passcode
    let passcode = Math.random().toString(36).slice(-6).toUpperCase();
    // Check if this passcode is not exist
    while (
      (await this.organizationRepository.findOneBy({ code: passcode })) != null
    ) {
      passcode = Math.random().toString(36).slice(-6).toUpperCase();
    }
    await this.organizationRepository.save({
      organizationId: organizationId,
      code: passcode,
    });
    return passcode;
  }
}
