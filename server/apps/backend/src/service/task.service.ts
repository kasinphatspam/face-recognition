import { OTPRepository } from '@/repositories/otp.repository';
import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class TasksService {
  constructor(private readonly otpRepository: OTPRepository) {}

  @Cron('45 * * * * *')
  async handleCron() {
    const otp = await this.otpRepository.findAll();
    for (const i of otp) {
      if (i.expireTime < new Date()) {
        this.otpRepository.delete(i.id);
      }
    }
  }
}
