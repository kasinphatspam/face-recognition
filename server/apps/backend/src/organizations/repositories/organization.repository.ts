import { connection } from '@/common/helpers/connection.helper';
import { Organization } from '@/common/entities';
import {
  CreateOrganizationDto,
  UpdateOrganizationDto,
} from '@/common/dto/organization.dto';
import { Injectable } from '@nestjs/common';
import { DeleteResult, InsertResult, Repository } from 'typeorm';
import { OrganizationInterface } from '@/common/interfaces/organization.interface';

@Injectable()
export class OrganizationRepository
  extends Repository<Organization>
  implements OrganizationInterface
{
  constructor() {
    super(Organization, connection.createEntityManager());
  }

  public async findAll(
    this: Repository<Organization>,
  ): Promise<Organization[]> {
    return this.find({ relations: ['roles'] });
  }

  public async getOrganizationBy(key: number | string): Promise<Organization> {
    if (typeof key === 'number') {
      return this.findOne({
        relations: ['roles'],
        where: { id: key as number },
      });
    }
    return this.findOne({
      where: { passcode: key as string },
      relations: ['roles'],
    });
  }

  public async createNewOrganization(
    payload: CreateOrganizationDto,
  ): Promise<InsertResult> {
    return this.createQueryBuilder()
      .insert()
      .into(Organization)
      .values([
        {
          name: payload.name,
          passcode: payload.passcode,
          codeCreatedTime: payload.codeCreatedTime,
          packageKey: payload.packageKey,
          plan: { id: payload.plan },
        },
      ])
      .execute();
  }
  public async updateById(
    id: number,
    body: UpdateOrganizationDto,
  ): Promise<Organization> {
    return this.save({
      ...body,
      id: id,
    });
  }

  public async deleteById(id: number): Promise<DeleteResult> {
    return this.delete({ id: id });
  }
}
