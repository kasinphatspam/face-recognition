import {
  BadRequestException,
  NotFoundException,
  Injectable,
} from '@nestjs/common';
import { Organization } from '@/common/entities';
import {
  CreateOrganizationDto,
  UpdateOrganizationDto,
} from '@/common/dto/organization.dto';
import { RoleService } from '@/roles/role.service';
import { RecognitionService } from '@/contacts/recognition.service';
import { InsertResult } from 'typeorm';
import { OrganizationRepository } from '@/organizations/repositories/organization.repository';
import { UserRepository } from '@/users/user.repository';
import { PlanRepository } from '@/common/repositories/plan.repository';
import { RoleRepository } from '@/roles/role.repository';

@Injectable()
export class OrganizationService {
  constructor(
    private readonly recognitionApiService: RecognitionService,
    private readonly roleService: RoleService,
    private readonly roleRepository: RoleRepository,
    private readonly organizationRepository: OrganizationRepository,
    private readonly userRepository: UserRepository,
    private readonly planRepository: PlanRepository,
  ) {}

  public async getOrganizationById(
    organizationId: number,
  ): Promise<Organization> {
    const organization = await this.organizationRepository.getOrganizationBy(
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
    const property = await this.userRepository.getUserBy(userId, [
      'organization',
    ]);

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
    const payload = {
      ...body,
      date: new Date(),
      packageKey: packageKey,
      plan: plan.id,
      passcode: await this.randomPasscodeWithUniqueResult(),
    } as CreateOrganizationDto;

    const organization =
      await this.organizationRepository.createNewOrganization(payload);

    // Create simple role to new organization
    const roleId = await this.createSimpleRole(organization);
    // Put organization id and role_id to user table with user id
    await this.userRepository.updateById(userId, {
      roleId: roleId,
      organizationId: organization.raw.insertId,
    });
  }

  public async update(organization: Organization, body: UpdateOrganizationDto) {
    if (!organization)
      throw new NotFoundException("User didn't join organization");
    return this.organizationRepository.update(organization.id, body);
  }

  public async deleteOrganization(organization: Organization) {
    if (!organization)
      throw new NotFoundException("User didn't join organization");

    // Find the roles in this organization
    const roleProperty = await this.roleRepository.findAllBy(
      organization.id,
      'organization',
    );
    for (const i of roleProperty) {
      // Find the user account that uses this role.
      const userArray = await this.userRepository.getAllUsersBy(
        [organization.id, i.id],
        'both',
        ['organization', 'role'],
      );
      // Remove the role id and organization id in each account of this organization
      for (const j of userArray) {
        if (j != null) {
          await this.userRepository.updateById(j.id, {
            roleId: null,
            organizationId: null,
          });
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
    const user = await this.userRepository.getUserBy(userId, ['organization']);

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
    const organization = await this.organizationRepository.getOrganizationBy(
      passcode,
    );
    if (!organization) {
      throw new BadRequestException('Wrong passcode');
    }
    // Find user role id in organization
    const roleId = await this.roleService.findAll(organization.id);
    // Add orgnaization id to user account
    await this.userRepository.updateById(userId, {
      roleId: roleId[1].id,
      organizationId: organization.id,
    });
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
      (await this.organizationRepository.getOrganizationBy(passcode)) != null
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
