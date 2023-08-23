import { Module } from '@nestjs/common';
import { UserService } from '@/service/user.service';
import { UserController } from '@/controller/user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Organization, Role, User } from '@/entity';
import { RoleService } from '@/service/role.service';
import { OrganizationService } from '@/service/organization.service';
import { RecognitionApiService } from '@/service/recognition.api.service';
import { ImageService } from '@/service/image.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Organization, Role])],
  providers: [
    UserService,
    OrganizationService,
    RoleService,
    RecognitionApiService,
    ImageService,
  ],
  controllers: [UserController],
})
export class UserModule {}
