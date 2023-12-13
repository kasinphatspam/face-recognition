import { Module, forwardRef } from '@nestjs/common';
import { UserService } from '@/users/user.service';
import { UserController } from '@/users/user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import entities from '@/common/entities';
import { UserRepository } from '@/users/user.repository';
import { AuthModule } from '@/auth/auth.module';
import { OrganizationModule } from '@/organizations/organization.module';
import { RoleModule } from '@/roles/role.module';
import { EmployeeModule } from '@/employees/employee.module';

@Module({
  imports: [
    TypeOrmModule.forFeature(entities),
    AuthModule,
    forwardRef(() => OrganizationModule),
    forwardRef(() => EmployeeModule),
    forwardRef(() => RoleModule),
  ],
  providers: [UserService, UserRepository],
  exports: [UserService, UserRepository],
  controllers: [UserController],
})
export class UserModule {}
