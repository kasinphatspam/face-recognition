import { Module } from '@nestjs/common';
import { AuthController } from '@/controller/auth.controller';
import { AuthService } from '@/service/auth.service';
import entities from '@/entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from '@/service/user.service';
import { ImageService } from '@/service/image.service';
import { JwtModule } from '@nestjs/jwt';
import * as dotenv from 'dotenv';
import { UserRepository } from '@/repositories/user.repository';
import { OTPService } from '@/service/otp.service';
import { NotificationEmailService } from '@/service/notification.email.service';
import { OTPRepository } from '@/repositories/otp.repository';
import {
  DoSpacesServiceProvider,
  UploadService,
} from '@/service/upload.service';

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
    ImageService,
    OTPService,
    OTPRepository,
    NotificationEmailService,
    UploadService,
    DoSpacesServiceProvider,
  ],
  exports: [AuthService],
})
export class AuthModule {}
