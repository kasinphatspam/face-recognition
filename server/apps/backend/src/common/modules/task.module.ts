import { OrganizationRepository } from '@/organizations/repositories/organization.repository';
import { OTPRepository } from '@/common/repositories/otp.repository';
import { PlanRepository } from '@/common/repositories/plan.repository';
import { RoleRepository } from '@/roles/role.repository';
import { UserRepository } from '@/users/user.repository';
import { ImageService } from '@/common/services/image.service';
import { NotificationEmailService } from '@/common/services/notification.email.service';
import { OrganizationService } from '@/organizations/services/organization.service';
import { OTPService } from '@/common/services/otp.service';
import { RecognitionService } from '@/contacts/recognition.service';
import { RoleService } from '@/roles/role.service';
import { TasksService } from '@/common/services/task.service';
import {
  DoSpacesServiceProvider,
  UploadService,
} from '@/common/services/upload.service';
import { UserService } from '@/users/user.service';
import { Module } from '@nestjs/common';

@Module({
  providers: [
    OTPRepository,
    OTPService,
    NotificationEmailService,
    UserRepository,
    TasksService,
    OrganizationService,
    OrganizationRepository,
    UserRepository,
    UserService,
    RecognitionService,
    RoleService,
    PlanRepository,
    ImageService,
    UploadService,
    RoleRepository,
    DoSpacesServiceProvider,
  ],
})
export class TaskModule {}
