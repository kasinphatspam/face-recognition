import { connection } from '@/utils/connection';
import { Organization, Plan } from '@/entity';
import { UpdateOrganizationDto } from '@/utils/dtos/organization.dto';
import { Injectable } from '@nestjs/common';
import { InsertResult } from 'typeorm';

@Injectable()
export class OrganizationRepository {
  public async getOrganizationById(
    organizationId: number,
  ): Promise<Organization> {
    return connection.getRepository(Organization).findOneBy({
      id: organizationId,
    });
  }

  public async getOrganizationByPasscode(passcode: string) {
    return connection.getRepository(Organization).findOneBy({
      passcode: passcode,
    });
  }

  public async createNewOrganization(
    name: string,
    passcode: string,
    date: Date,
    packageKey: string,
    plan: Plan,
  ): Promise<InsertResult> {
    return connection
      .getRepository(Organization)
      .createQueryBuilder()
      .insert()
      .into(Organization)
      .values([
        {
          name: name,
          passcode: passcode,
          codeCreatedTime: date,
          packageKey: packageKey,
          plan: plan,
        },
      ])
      .execute();
  }

  public async update(organizationId: number, body: UpdateOrganizationDto) {
    return connection.getRepository(Organization).save({
      id: organizationId,
      name: body.name,
      passcode: body.passcode,
      codeCreatedTime: body.codeCreatedTime,
      vtigerToken: body.vtigerToken,
      vtigerAccessKey: body.vtigerAccessKey,
      vtigerLink: body.vtigerLink,
      packageKey: body.packageKey,
      isPublic: body.isPublic,
    });
  }

  public async delete(organizationId: number) {
    return connection.getRepository(Organization).delete({
      id: organizationId,
    });
  }
}
