import { OTPRepository } from '@/common/repositories/otp.repository';
import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { OrganizationRepository } from '@/organizations/repositories/organization.repository';
import { UserRepository } from '@/users/user.repository';
import { OrganizationService } from '@/organizations/services/organization.service';
import { UploadService } from '@/common/services/upload.service';

@Injectable()
export class TasksService {
  constructor(
    private readonly otpRepository: OTPRepository,
    private readonly organizationRepository: OrganizationRepository,
    private readonly organizationService: OrganizationService,
    private readonly userRepository: UserRepository,
    private readonly uploadService: UploadService,
  ) {}

  @Cron(CronExpression.EVERY_10_MINUTES)
  public async handleCron() {
    const otp = await this.otpRepository.findAll();
    if (!otp) return;
    for (const i of otp) {
      if (i.expireTime < new Date()) {
        Logger.log(`OTP (${i.topic}): ${i.id} timeout`, 'TaskSchedule');
        this.otpRepository.delete(i.id);
      }
    }
  }

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  public async checkOrganizationMember() {
    Logger.log(
      'Removing empty organization services is currently running',
      'TaskSchedule',
    );
    const organization = await this.organizationRepository.findAll();
    for (const i of organization) {
      const user = await this.userRepository.getAllUsersBy(
        i.id,
        'organization',
        null,
      );
      if (user.length < 1 || user == undefined) {
        Logger.log(`Organization id: ${i.id} was removed`, 'TaskSchedule');
        await this.organizationService.deleteOrganization(i);
      }
    }
  }

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  public async realDeleteUsers() {
    const users = await this.userRepository.find({ where: { isDelete: true } });
    if (users.length > 0) {
      await this.userRepository.realDeleteUsers();
      const deleteImageArray: Promise<void>[] = [];
      users.forEach((user) => {
        deleteImageArray.push(
          this.uploadService.deleteImageFromStorage('users', user.id),
        );
      });
      Promise.all(deleteImageArray);
    }
  }
}
