import { OTPRepository } from '@/repositories/otp.repository';
import { UserRepository } from '@/repositories/user.repository';
import { NotificationEmailService } from '@/service/notification.email.service';
import { OTPService } from '@/service/otp.service';
import { TasksService } from '@/service/task.service';
import { Module } from '@nestjs/common';

@Module({
  providers: [
    OTPRepository,
    OTPService,
    NotificationEmailService,
    UserRepository,
    TasksService,
  ],
})
export class TaskModule {}
