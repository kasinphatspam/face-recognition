import { Module } from '@nestjs/common';
import { OrganizationService } from '../service/organization.service';
import { OrganizationController } from '../controller/organization.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Organization, OrganizationRole, Role, User } from 'src/entity';
import { RoleService } from 'src/service/role.service';

@Module({
  imports: [TypeOrmModule.forFeature([Organization, OrganizationRole, Role, User])],
  providers: [OrganizationService, RoleService],
  controllers: [OrganizationController],
})

export class OrganizationModule { }