import { AuthModule } from '@/auth/auth.module';
import entities from '@/common/entities';
import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeeController } from './employee.controller';
import { UserModule } from '@/users/user.module';
import { OrganizationModule } from '@/organizations/organization.module';

@Module({
  imports: [
    TypeOrmModule.forFeature(entities),
    AuthModule,
    forwardRef(() => UserModule),
    forwardRef(() => OrganizationModule),
  ],
  controllers: [EmployeeController],
})
export class EmployeeModule {}
