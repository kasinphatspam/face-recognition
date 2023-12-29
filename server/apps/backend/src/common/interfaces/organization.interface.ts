import { Organization } from '@/common/entities';
import { DeleteResult, InsertResult } from 'typeorm';
import {
  CreateOrganizationDto,
  UpdateOrganizationDto,
} from '@/common/dto/organization.dto';

type GetOrganizationWiths = 'users' | 'plan' | 'contacts' | 'roles';

interface OrganizationInterface {
  findAll(): Promise<Organization[]>;
  getOrganizationBy(key: number): Promise<Organization>;
  createNewOrganization(payload: CreateOrganizationDto): Promise<InsertResult>;
  updateById(id: number, body: UpdateOrganizationDto): Promise<Organization>;
  deleteById(id: number): Promise<DeleteResult>;
}

export { OrganizationInterface, GetOrganizationWiths };
