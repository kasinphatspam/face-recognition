import { OTPRepository } from '@/repositories/otp.repository';
import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class TasksService {
  constructor(private readonly otpRepository: OTPRepository) {}

  @Cron('45 * * * * *')
  async handleCron() {
    const otp = await this.otpRepository.findAll();
    console.log(otp);
    for (const i of otp) {
      if (i.expireTime < new Date()) {
        this.otpRepository.delete(i.id);
      }
    }
    console.log('Called when the current second is 45');
  }
}
