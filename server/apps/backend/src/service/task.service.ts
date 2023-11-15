import { OTPRepository } from '@/repositories/otp.repository';
import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { OrganizationRepository } from '@/repositories/organization.repository';
import { UserRepository } from '@/repositories/user.repository';
import { OrganizationService } from './organization.service';

@Injectable()
export class TasksService {
  constructor(
    private readonly otpRepository: OTPRepository,
    private readonly organizationRepository: OrganizationRepository,
    private readonly organizationService: OrganizationService,
    private readonly userRepository: UserRepository,
  ) {}

  @Cron(CronExpression.EVERY_10_MINUTES)
  async handleCron() {
    const otp = await this.otpRepository.findAll();
    for (const i of otp) {
      if (i.expireTime < new Date()) {
        Logger.log(`OTP (${i.topic}): ${i.id} timeout`, 'TaskSchedule');
        this.otpRepository.delete(i.id);
      }
    }
  }

  @Cron(CronExpression.EVERY_DAY_AT_10PM)
  async checkOrganizationMember() {
    Logger.log(
      'Removing empty organization services is currently running',
      'TaskSchedule',
    );
    const organization = await this.organizationRepository.findAll();
    for (const i of organization) {
      const user = await this.userRepository.findAllByOrganizationId(i.id);
      if (user.length < 1 || user == undefined) {
        Logger.log(`Organization id: ${i.id} was removed`, 'TaskSchedule');
        await this.organizationService.deleteOrganization(i.id);
      }
    }
  }
}
