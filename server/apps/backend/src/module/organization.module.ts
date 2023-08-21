import { Module } from '@nestjs/common';
import { OrganizationService } from '../service/organization.service';
import { OrganizationController } from '../controller/organization.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Contact, Organization, Role, User } from 'src/entity';
import { RoleService } from 'src/service/role.service';
import { EmployeeService } from 'src/service/employee.service';
import { ContactService } from 'src/service/contact.service';
import { RecognitionApiService } from 'src/service/recognition.api.service';

@Module({
  imports: [TypeOrmModule.forFeature([Organization, Role, User, Contact])],
  providers: [
    OrganizationService,
    RoleService,
    EmployeeService,
    ContactService,
    RecognitionApiService,
  ],
  controllers: [OrganizationController],
})
export class OrganizationModule {}
