import { OTPRepository } from '@/repositories/otp.repository';
import { UserRepository } from '@/repositories/user.repository';
import { Injectable } from '@nestjs/common';
import { NotificationEmailService } from './notification.email.service';
import { MailOptions } from 'nodemailer/lib/json-transport';

@Injectable()
export class OTPService {
  constructor(
    private readonly notificationService: NotificationEmailService,
    private readonly otpRepository: OTPRepository,
    private readonly userRepository: UserRepository,
  ) {}
  public async send(userId: number, topic: string) {
    const previousOTP = await this.otpRepository.findAllByUserId(userId);

    if (previousOTP) {
      for (const i of previousOTP) {
        if (i.topic == topic && i.user.id == userId) {
          this.otpRepository.delete(i.id);
          break;
        }
      }
    }

    const user = await this.userRepository.getUserById(userId, null);
    const code = Math.floor(100000 + Math.random() * 900000);

    const confirmationTemplate = (email: string, code: string) => {
      return {
        from: `Face Prove <${process.env.EMAIL_USERNAME}>`,
        to: email,
        subject: topic,
        text: topic,
        html: `
          <p>Your account verification code is <b>${code}</b>.</p>
          <p>Please use the code within <b>1800</b> seconds. if you did not make this request, please ignore this email.</p>
        `,
      } as MailOptions;
    };

    await this.notificationService.send(
      confirmationTemplate(user.email, String(code)),
    );

    return this.otpRepository.insert(topic, user, String(code));
  }

  public async verify(
    userId: number,
    topic: string,
    code: string,
  ): Promise<boolean> {
    const previousOTP = await this.otpRepository.findAllByUserId(userId);

    for (const i of previousOTP) {
      if (i.topic == topic && i.user.id == userId && i.code == code) {
        await this.otpRepository.delete(i.id);
        return true;
      }
    }
    return false;
  }
}
