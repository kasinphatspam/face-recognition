import { Module } from '@nestjs/common';
import { UserService } from '@/service/user.service';
import { UserController } from '@/controller/user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import entities from '@/entity';
import { RoleService } from '@/service/role.service';
import { OrganizationService } from '@/service/organization.service';
import { RecognitionApiService } from '@/service/recognition.api.service';
import { ImageService } from '@/service/image.service';
import { UserRepository } from '@/repositories/user.repository';
import { OrganizationRepository } from '@/repositories/organization.repository';
import { RoleRepository } from '@/repositories/role.repository';

@Module({
  imports: [TypeOrmModule.forFeature(entities)],
  providers: [
    UserService,
    UserRepository,
    OrganizationService,
    OrganizationRepository,
    RoleService,
    RoleRepository,
    RecognitionApiService,
    ImageService,
  ],
  controllers: [UserController],
})
export class UserModule {}
