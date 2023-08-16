import { Module } from '@nestjs/common';
import { UserService } from '../service/user.service';
import { UserController } from '../controller/user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Organization, Role, User } from 'src/entity';
import { RoleService } from 'src/service/role.service';
import { OrganizationService } from 'src/service/organization.service';
import { RecognitionApiService } from 'src/service/recognition.api.service';

@Module({
    imports: [TypeOrmModule.forFeature([User, Organization, Role])],
    providers: [UserService, OrganizationService, RoleService, RecognitionApiService],
    controllers: [UserController],
})

export class UserModule { }