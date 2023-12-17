import { OTPRepository } from '@/common/repositories/otp.repository';
import { ImageService } from '@/common/services/image.service';
import { NotificationEmailService } from '@/common/services/notification.email.service';
import { OTPService } from '@/common/services/otp.service';
import { TasksService } from '@/common/services/task.service';
import {
  DoSpacesServiceProvider,
  UploadService,
} from '@/common/services/upload.service';
import { Module, forwardRef } from '@nestjs/common';
import { UserModule } from '@/users/user.module';
import { OrganizationModule } from '@/organizations/organization.module';
import { PlanModule } from './plan.module';
import { RoleModule } from '@/roles/role.module';

@Module({
  imports: [
    forwardRef(() => UserModule),
    forwardRef(() => OrganizationModule),
    forwardRef(() => PlanModule),
    forwardRef(() => RoleModule),
  ],
  providers: [
    OTPRepository,
    OTPService,
    NotificationEmailService,
    TasksService,
    ImageService,
    UploadService,
    DoSpacesServiceProvider,
  ],
})
export class TaskModule {}
