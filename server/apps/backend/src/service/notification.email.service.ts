import { AuthForgotPasswordDto } from '@/utils/dtos/auth.dto';
import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { MailOptions } from 'nodemailer/lib/json-transport';
import * as dotenv from 'dotenv';

dotenv.config();
@Injectable()
export class NotificationEmailService {
  private readonly transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      secure: true,
      auth: {
        user: process.env.GMAIL_USERNAME,
        pass: process.env.GMAIL_PASSWORD,
      },
    });
  }

  public async send(mailOptions: MailOptions) {
    return this.transporter.sendMail(mailOptions);
  }

  public async notifyUserForForgotPassword(body: AuthForgotPasswordDto) {
    return this.send(forgotPasswordEmailTemplate(body.email, '7832344'));
  }
}

export const forgotPasswordEmailTemplate = (email: string, code: string) => {
  return {
    from: `Face Prove <${process.env.EMAIL_USERNAME}>`,
    to: email,
    subject: `Reset your password`,
    text: 'Reset your password',
    html: `
      <p>Your account verification code is <b>${code}</b>.</p>
      <p>Please use the code within <b>1800</b> seconds. if you did not make this request, please ignore this email.</p>
    `,
  } as MailOptions;
};
