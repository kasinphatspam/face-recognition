import { OTPRepository } from '@/repositories/otp.repository';
import { UserRepository } from '@/repositories/user.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class OTPService {
  constructor(
    private readonly otpRepository: OTPRepository,
    private readonly userRepository: UserRepository,
  ) {}
  public async send(userId: number, topic: string) {
    const previousOTP = await this.otpRepository.findAllByUserId(userId);

    for (const i of previousOTP) {
      if (i.topic == topic && i.user.id == userId) {
        this.otpRepository.delete(i.id);
        break;
      }
    }
    const user = await this.userRepository.getUserById(userId, null);
    // call notify sender here
    return this.otpRepository.insert(topic, user);
  }

  public async verify(userId: number, topic: string, code: string) {
    const previousOTP = await this.otpRepository.findAllByUserId(userId);

    for (const i of previousOTP) {
      if (i.topic == topic && i.user.id == userId && i.code == code) {
        await this.otpRepository.delete(i.id);
        return 1;
      }
    }
    return 0;
  }
}
