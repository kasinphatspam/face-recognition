import { Module } from '@nestjs/common';
import { OrganizationService } from '@/service/organization.service';
import { OrganizationController } from '@/controller/organization.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import entities from '@/entity';
import { RoleService } from '@/service/role.service';
import { EmployeeService } from '@/service/employee.service';
import { ContactService } from '@/service/contact.service';
import { RecognitionApiService } from '@/service/recognition.api.service';
import { UserService } from '@/service/user.service';
import { ImageService } from '@/service/image.service';
import { UserRepository } from '@/repositories/user.repository';
import { OrganizationRepository } from '@/repositories/organization.repository';
import { ContactRepository } from '@/repositories/contact.repository';
import { RoleRepository } from '@/repositories/role.repository';

@Module({
  imports: [TypeOrmModule.forFeature(entities)],
  providers: [
    OrganizationService,
    OrganizationRepository,
    UserService,
    UserRepository,
    ImageService,
    RoleService,
    RoleRepository,
    EmployeeService,
    ContactService,
    ContactRepository,
    RecognitionApiService,
  ],
  controllers: [OrganizationController],
})
export class OrganizationModule {}
