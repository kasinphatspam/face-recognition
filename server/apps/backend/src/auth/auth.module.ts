import { Module } from '@nestjs/common';
import { AuthController } from '@/auth/auth.controller';
import { AuthService } from '@/auth/auth.service';
import entities from '@/common/entities';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from '@/users/user.service';
import { ImageService } from '@/common/services/image.service';
import { JwtModule } from '@nestjs/jwt';
import * as dotenv from 'dotenv';
import { UserRepository } from '@/users/user.repository';
import { OTPService } from '@/common/services/otp.service';
import { NotificationEmailService } from '@/common/services/notification.email.service';
import { OTPRepository } from '@/common/repositories/otp.repository';
import {
  DoSpacesServiceProvider,
  UploadService,
} from '@/common/services/upload.service';

dotenv.config();

@Module({
  imports: [
    TypeOrmModule.forFeature(entities),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    UserService,
    UserRepository,
    OTPService,
    OTPRepository,
    NotificationEmailService,
    ImageService,
    UploadService,
    DoSpacesServiceProvider,
  ],
  exports: [
    AuthService,
    ImageService,
    UploadService,
    OTPService,
    OTPRepository,
    NotificationEmailService,
    DoSpacesServiceProvider,
  ],
})
export class AuthModule {}
