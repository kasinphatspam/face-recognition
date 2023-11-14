import { Module } from '@nestjs/common';
import { OrganizationService } from '@/service/organization.service';
import { OrganizationController } from '@/controller/organization.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import entities from '@/entity';
import { RoleService } from '@/service/role.service';
import { EmployeeService } from '@/service/employee.service';
import { ContactService } from '@/service/contact.service';
import { UserService } from '@/service/user.service';
import { ImageService } from '@/service/image.service';
import { UserRepository } from '@/repositories/user.repository';
import { OrganizationRepository } from '@/repositories/organization.repository';
import { ContactRepository } from '@/repositories/contact.repository';
import { RoleRepository } from '@/repositories/role.repository';
import { HistoryRepository } from '@/repositories/history.repository';
import { RecognitionService } from '@/service/recognition.service';
import { AuthModule } from '@/module/auth.module';
import { PlanRepository } from '@/repositories/plan.repository';
import {
  DoSpacesServiceProvider,
  UploadService,
} from '@/service/upload.service';

@Module({
  imports: [TypeOrmModule.forFeature(entities), AuthModule],
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
    RecognitionService,
    HistoryRepository,
    PlanRepository,
    UploadService,
    DoSpacesServiceProvider,
  ],
  controllers: [OrganizationController],
})
export class OrganizationModule {}
