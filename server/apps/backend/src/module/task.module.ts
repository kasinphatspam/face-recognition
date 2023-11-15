import { OrganizationRepository } from '@/repositories/organization.repository';
import { OTPRepository } from '@/repositories/otp.repository';
import { PlanRepository } from '@/repositories/plan.repository';
import { RoleRepository } from '@/repositories/role.repository';
import { UserRepository } from '@/repositories/user.repository';
import { ImageService } from '@/service/image.service';
import { NotificationEmailService } from '@/service/notification.email.service';
import { OrganizationService } from '@/service/organization.service';
import { OTPService } from '@/service/otp.service';
import { RecognitionService } from '@/service/recognition.service';
import { RoleService } from '@/service/role.service';
import { TasksService } from '@/service/task.service';
import {
  DoSpacesServiceProvider,
  UploadService,
} from '@/service/upload.service';
import { UserService } from '@/service/user.service';
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
