import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Organization, User } from '@/entity';
import {
  CreateOrganizationDto,
  UpdateOrganizationDto,
} from '@/utils/dtos/organization.dto';
import { RoleService } from '@/service/role.service';
import { RecognitionApiService } from '@/service/recognition.api.service';
import { InsertResult, Repository } from 'typeorm';

@Injectable()
export class OrganizationService {
  constructor(
    private readonly recognitionApiService: RecognitionApiService,
    private readonly roleService: RoleService,
    @InjectRepository(Organization) private organizationRepository: Repository<Organization>,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) { }

  public async getOrganizationById(
    organizationId: number,
  ): Promise<Organization> {
    return await this.organizationRepository.findOneBy({
      id: organizationId,
    });
  }

  public async getCurrentOrganization(userId: number): Promise<Organization> {
    const user = await this.userRepository.findOne({
      relations: ['organization'],
      where: { id: userId }
    });

    if (!user) {
      throw new BadRequestException('User not found');
    }
    if (!user.organization) {
      throw new BadRequestException("User hasn't joined organization");
    }
    return user.organization;
  }

  public async createNewOraganization(
    userId: number,
    body: CreateOrganizationDto,
  ) {
    // Check if the user account exists or not.
    const property = await this.userRepository.findOneBy({
      id: userId,
    });
    if (!property) {
      throw new BadRequestException(`Not found user id: ${userId}`);
    }
    // Create dataset file on ml-server
    const packageKey = await this.recognitionApiService.createPackage();
    // Random passcode with unique result and insert data into database
    const organization = await this.organizationRepository
      .createQueryBuilder()
      .insert()
      .into(Organization)
      .values([
        {
          name: body.name,
          passcode: await this.randomPasscodeWithUniqueResult(),
          codeCreatedTime: new Date(),
          packageKey: packageKey,
        },
      ])
      .execute();
    // Create simple role to new organization
    const roleId = await this.createSimpleRole(organization)
    // Put organization id and role_id to user table with user id
    await this.userRepository.save({
      id: property.id,
      organization: { id: organization.raw.insertId },
      role: { id: roleId },
    });
  }

  public async updateOrganizationInfo(
    organizationId: number,
    body: UpdateOrganizationDto,
  ) {
    return await this.organizationRepository.save({
      id: organizationId,
      name: body.name,
      vtigerToken: body.vtigerToken,
      vtigerAccessKey: body.vtigerAccessKey,
      vtigerLink: body.vtigerLink
    });
  }

  public async deleteOrganization(organizationId: number) {
    // Find the roles in this organization
    const roleProperty = await this.roleService.getAllRole(organizationId)
    for (var i of roleProperty) {
      // Find the user account that uses this role.
      const userProperty = await this.userRepository
        .find({ where: { organization: { id: organizationId }, role: { id: i.id } } })
      // Remove the role id and organization id in each account of this organization
      for (var j of userProperty) {
        if (j != null)
          await this.userRepository.save({ id: j.id, organization: null, role: null })
      }
      // Force delete the role 
      await this.roleService.forceDeleteRole(organizationId, i.id)
    }
    // Delete the organization
    return await this.organizationRepository.delete({
      id: organizationId,
    });
  }

  public async joinOrganizationWithPasscode(userId: number, passcode: string) {
    // Find the organization with passcode
    const organization = await this.organizationRepository.findOneBy({
      passcode,
    });
    if (!organization) {
      throw new BadRequestException('Wrong passcode');
    }
    // Find user role id in organization
    const roleId = await this.roleService.getAllRole(organization.id)
    // Add orgnaization id to user account
    await this.userRepository.save({
      id: userId,
      organization: { id: organization.id },
      role: { id: roleId[1].id }
    });
    return organization;
  }

  public async generateNewPasscode(organizationId: number): Promise<string> {
    // Generate a random passcode
    const passcode = this.randomPasscodeWithUniqueResult()
    // Update organization passcode and return it
    await this.organizationRepository.save({
      id: organizationId,
      code: passcode,
    });
    return passcode;
  }

  private async randomPasscodeWithUniqueResult() {
    // Generate a random passcode
    let passcode = Math.random().toString(36).slice(-6).toUpperCase();
    // Check if this passcode is not exist
    while (
      (await this.organizationRepository.findOneBy({ passcode })) != null
    ) {
      passcode = Math.random().toString(36).slice(-6).toUpperCase();
    }
    return passcode
  }

  private async createSimpleRole(organization: InsertResult) {
    // Create an admin role to control and manage the organization.
    const roleId = await this.roleService.createNewRole(
      'administrator',
      organization.raw.insertId,
    );
    // Create an general user role for employee in organization
    await this.roleService.createNewRole(
      'user',
      organization.raw.insertId
    );
    return roleId
  }
}
