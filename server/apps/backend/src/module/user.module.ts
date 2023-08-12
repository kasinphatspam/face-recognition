import { Module } from '@nestjs/common';
import { UserService } from '../service/user.service';
import { UserController } from '../controller/user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Organization, Role, User } from 'src/entity';
import { RoleService } from 'src/service/role.service';
import { OrganizationService } from 'src/service/organization.service';

@Module({
    imports: [TypeOrmModule.forFeature([User, Organization, Role])],
    providers: [UserService, OrganizationService, RoleService],
    controllers: [UserController],
})

export class UserModule { }