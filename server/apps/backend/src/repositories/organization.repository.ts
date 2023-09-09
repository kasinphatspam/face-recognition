import { connection } from '@/connection';
import { Organization, User } from '@/entity';
import { UpdateOrganizationDto } from '@/utils/dtos/organization.dto';
import { Injectable } from '@nestjs/common';
import { InsertResult } from 'typeorm';

@Injectable()
export class OrganizationRepository {
  public async getOrganizationById(
    organizationId: number,
  ): Promise<Organization> {
    return await connection.getRepository(Organization).findOneBy({
      id: organizationId,
    });
  }

  public async getOrganizationByUserId(userId: number) {
    return await connection.getRepository(User).findOne({
      relations: ['organization'],
      where: { id: userId },
    });
  }

  public async getOrganizationByPasscode(passcode: string) {
    return await connection.getRepository(Organization).findOneBy({
      passcode: passcode,
    });
  }

  public async createNewOrganization(
    name: string,
    passcode: string,
    date: Date,
    packageKey: string,
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
        },
      ])
      .execute();
  }

  public async updateOrganizationInformation(
    organizationId: number,
    body: UpdateOrganizationDto,
  ) {
    return await connection.getRepository(Organization).save({
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

  public async deleteOrganization(organizationId: number) {
    return await connection.getRepository(Organization).delete({
      id: organizationId,
    });
  }
}
