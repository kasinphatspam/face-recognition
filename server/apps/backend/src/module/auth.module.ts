import { Module } from '@nestjs/common';
import { AuthController } from '@/controller/auth.controller';
import { AuthService } from '@/service/auth.service';
import { User } from '@/entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from '@/service/user.service';
import { ImageService } from '@/service/image.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [AuthController],
  providers: [AuthService, UserService, ImageService],
})
export class AuthModule {}
