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
  providers: [AuthService, UserService, UserRepository, ImageService],
})
export class AuthModule {}
