import {
  BadRequestException,
  NotFoundException,
  Injectable,
} from '@nestjs/common';
import { Organization, User } from '@/entity';
import {
  CreateOrganizationDto,
  UpdateOrganizationDto,
} from '@/utils/dtos/organization.dto';
import { RoleService } from '@/service/role.service';
import { RecognitionService } from '@/service/recognition.service';
import { InsertResult } from 'typeorm';
import { OrganizationRepository } from '@/repositories/organization.repository';
import { UserRepository } from '@/repositories/user.repository';
import { PlanRepository } from '@/repositories/plan.repository';
import { UserService } from './user.service';

@Injectable()
export class OrganizationService {
  constructor(
    private readonly recognitionApiService: RecognitionService,
    private readonly roleService: RoleService,
    private readonly organizationRepository: OrganizationRepository,
    private readonly userService: UserService,
    private readonly userRepository: UserRepository,
    private readonly planRepository: PlanRepository,
  ) {}

  public async getOrganizationById(
    organizationId: number,
  ): Promise<Organization> {
    const organization = await this.organizationRepository.getOrganizationById(
      organizationId,
    );

    if (!organization) {
      throw new NotFoundException('Organization not found');
    }
    return organization;
  }

  public async createNewOraganization(
    userId: number,
    body: CreateOrganizationDto,
  ) {
    // Check if the user account exists or not.
    const property = await this.userService.getUserBy(userId, ['organization']);

    if (property.organization) {
      throw new BadRequestException('User already has organization');
    }

    // Check if client sent package id or not
    if (!body.planId) {
      // Find free package
      const plan = await this.planRepository.getPlanByCost(0);
      if (!plan) {
        const result = await this.planRepository.createPlan({
          title: 'Free package',
          cost: 0,
          limitEmployee: 1,
          limitContact: 50,
        });
        body.planId = result.raw.insertId;
      } else {
        body.planId = plan.id;
      }
    }

    const plan = await this.planRepository.getPlanById(body.planId);
    if (!plan) {
      throw new NotFoundException('Plan not found');
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
        plan,
      );

    // Create simple role to new organization
    const roleId = await this.createSimpleRole(organization);
    // Put organization id and role_id to user table with user id
    await this.userRepository.setOrganization(
      property.id,
      organization.raw.insertId,
    );
    await this.userRepository.setRole(property.id, roleId);
  }

  public async update(user: User, body: UpdateOrganizationDto) {
    if (!user.organization)
      throw new NotFoundException("User didn't join organization");
    return this.organizationRepository.update(user.organization.id, body);
  }

  public async deleteOrganization(organization: Organization) {
    if (!organization)
      throw new NotFoundException("User didn't join organization");
    // Find the roles in this organization
    const roleProperty = await this.roleService.findAll(organization.id);
    for (const i of roleProperty) {
      // Find the user account that uses this role.
      const userArray =
        await this.userRepository.findAllByOrganizationIdAndRoleId(
          organization.id,
          i.id,
        );
      // Remove the role id and organization id in each account of this organization
      for (const j of userArray) {
        if (j != null) {
          await this.userRepository.setOrganization(j.id, null);
          await this.userRepository.setRole(j.id, null);
        }
      }
      // Force delete the role
      await this.roleService.forceDelete(organization.id, i.id);
    }
    await this.recognitionApiService.deletePackage(organization.packageKey);
    // Delete the organization
    return this.organizationRepository.delete(organization.id);
  }

  public async getCurrentOrganization(userId: number): Promise<Organization> {
    const user = await this.userService.getUserBy(userId, ['organization']);

    if (!user) {
      throw new NotFoundException('User not found');
    }
    if (!user.organization) {
      throw new NotFoundException("User hasn't joined organization");
    }
    return user.organization;
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
    await this.userRepository.setOrganization(userId, organization.id);
    await this.userRepository.setRole(userId, roleId[1].id);
    return organization;
  }

  public async generateNewPasscode(organizationId: number): Promise<string> {
    // Generate a random passcode
    const passcode = await this.randomPasscodeWithUniqueResult();
    // Check if organization is empty
    const organization = await this.getOrganizationById(organizationId);
    if (!organization) {
      throw new NotFoundException('Organization not found.');
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
