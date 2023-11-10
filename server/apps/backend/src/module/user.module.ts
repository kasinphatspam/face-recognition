import { Module } from '@nestjs/common';
import { UserService } from '@/service/user.service';
import { UserController } from '@/controller/user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import entities from '@/entity';
import { RoleService } from '@/service/role.service';
import { OrganizationService } from '@/service/organization.service';
import { RecognitionService } from '@/service/recognition.service';
import { ImageService } from '@/service/image.service';
import { UserRepository } from '@/repositories/user.repository';
import { OrganizationRepository } from '@/repositories/organization.repository';
import { RoleRepository } from '@/repositories/role.repository';
import { AuthModule } from '@/module/auth.module';
import { PlanRepository } from '@/repositories/plan.repository';

@Module({
  imports: [TypeOrmModule.forFeature(entities), AuthModule],
  providers: [
    UserService,
    UserRepository,
    OrganizationService,
    OrganizationRepository,
    RoleService,
    RoleRepository,
    RecognitionService,
    ImageService,
    PlanRepository,
  ],
  controllers: [UserController],
})
export class UserModule {}
