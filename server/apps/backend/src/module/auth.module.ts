import { Module } from '@nestjs/common';
import { AuthController } from '@/controller/auth.controller';
import { AuthService } from '@/service/auth.service';
import { User } from '@/entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from '@/service/user.service';
import { ImageService } from '@/service/image.service';
import { JwtModule } from '@nestjs/jwt';
import * as dotenv from 'dotenv';

dotenv.config();

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, UserService, ImageService],
})
export class AuthModule {}
