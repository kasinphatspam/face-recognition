import { BadRequestException, Injectable } from '@nestjs/common';
import { Organization } from '@/entity';
import {
  CreateOrganizationDto,
  UpdateOrganizationDto,
} from '@/utils/dtos/organization.dto';
import { RoleService } from '@/service/role.service';
import { RecognitionService } from '@/service/recognition.service';
import { InsertResult } from 'typeorm';
import { OrganizationRepository } from '@/repositories/organization.repository';
import { UserRepository } from '@/repositories/user.repository';

@Injectable()
export class OrganizationService {
  constructor(
    private readonly recognitionApiService: RecognitionService,
    private readonly roleService: RoleService,
    private readonly organizationRepository: OrganizationRepository,
    private readonly userRepository: UserRepository,
  ) {}

  public async getOrganizationById(
    organizationId: number,
  ): Promise<Organization> {
    return this.organizationRepository.getOrganizationById(organizationId);
  }

  public async getCurrentOrganization(userId: number): Promise<Organization> {
    const user = await this.userRepository.getUserById(userId, [
      'organization',
    ]);

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
    const property = await this.userRepository.getUserById(userId, null);
    if (!property) {
      throw new BadRequestException(`Not found user id: ${userId}`);
    }
    // Create dataset file on ml-server
    const packageKey = await this.recognitionApiService.createPackage();
    // Random passcode with unique result and insert data into database
    const organization =
      await this.organizationRepository.createNewOrganization(
        body.name,
        await this.randomPasscodeWithUniqueResult(),
        new Date(),
        packageKey,
      );

    // Create simple role to new organization
    const roleId = await this.createSimpleRole(organization);
    // Put organization id and role_id to user table with user id
    await this.userRepository.updateUserOrganization(
      property.id,
      organization.raw.insertId,
    );
    await this.userRepository.updateUserRole(property.id, roleId);
  }

  public async update(organizationId: number, body: UpdateOrganizationDto) {
    const organization = await this.organizationRepository.getOrganizationById(
      organizationId,
    );
    if (!organization) throw new BadRequestException('Not found organization.');
    return this.organizationRepository.update(organizationId, body);
  }

  public async deleteOrganization(organizationId: number) {
    // Find the roles in this organization
    const roleProperty = await this.roleService.findAll(organizationId);
    for (const i of roleProperty) {
      // Find the user account that uses this role.
      const userArray =
        await this.userRepository.findAllByOrganizationIdAndRoleId(
          organizationId,
          i.id,
        );
      // Remove the role id and organization id in each account of this organization
      for (const j of userArray) {
        if (j != null) {
          await this.userRepository.updateUserOrganization(j.id, null);
          await this.userRepository.updateUserRole(j.id, null);
        }
      }
      // Force delete the role
      await this.roleService.forceDelete(organizationId, i.id);
    }
    // Delete the organization
    return this.organizationRepository.delete(organizationId);
  }

  public async joinOrganizationWithPasscode(userId: number, passcode: string) {
    // Find the organization with passcode
    const organization =
      await this.organizationRepository.getOrganizationByPasscode(passcode);
    if (!organization) {
      throw new BadRequestException('Wrong passcode');
    }
    // Find user role id in organization
    const roleId = await this.roleService.findAll(organization.id);
    // Add orgnaization id to user account
    await this.userRepository.updateUserOrganization(userId, organization.id);
    await this.userRepository.updateUserRole(userId, roleId[1].id);
    return organization;
  }

  public async generateNewPasscode(organizationId: number): Promise<string> {
    // Generate a random passcode
    const passcode = await this.randomPasscodeWithUniqueResult();
    // Check if organization is empty
    const organization = await this.getOrganizationById(organizationId);
    if (!organization) {
      throw new BadRequestException('Not found organization.');
    }
    // Update organization passcode and return it
    const newData = {
      passcode: passcode,
      codeCreatedTime: new Date(),
    };

    const data: UpdateOrganizationDto = JSON.parse(JSON.stringify(newData));

    await this.organizationRepository.update(organizationId, data);
    return passcode;
  }

  private async randomPasscodeWithUniqueResult() {
    // Generate a random passcode
    let passcode = Math.random().toString(36).slice(-6).toUpperCase();
    // Check if this passcode is not exist
    while (
      (await this.organizationRepository.getOrganizationByPasscode(passcode)) !=
      null
    ) {
      passcode = Math.random().toString(36).slice(-6).toUpperCase();
    }
    return passcode;
  }

  private async createSimpleRole(organization: InsertResult) {
    // Create an admin role to control and manage the organization.
    const roleId = await this.roleService.createNewRole(
      'administrator',
      organization.raw.insertId,
    );
    // Create an general user role for employee in organization
    await this.roleService.createNewRole('user', organization.raw.insertId);
    return roleId;
  }
}
