import { Module, forwardRef } from '@nestjs/common';
import { OrganizationService } from '@/organizations/services/organization.service';
import { OrganizationController } from '@/organizations/organization.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import entities from '@/common/entities';
import { OrganizationRepository } from '@/organizations/repositories/organization.repository';
import { HistoryRepository } from '@/organizations/repositories/history.repository';
import { AuthModule } from '@/auth/auth.module';
import { PlanRepository } from '@/common/repositories/plan.repository';
import { UserModule } from '@/users/user.module';
import { RoleModule } from '@/roles/role.module';
import { EmployeeModule } from '@/employees/employee.module';
import { ContactModule } from '@/contacts/contact.module';

@Module({
  imports: [
    TypeOrmModule.forFeature(entities),
    AuthModule,
    forwardRef(() => UserModule),
    forwardRef(() => RoleModule),
    forwardRef(() => EmployeeModule),
    forwardRef(() => ContactModule),
  ],
  providers: [
    OrganizationService,
    OrganizationRepository,
    HistoryRepository,
    PlanRepository,
  ],
  exports: [
    OrganizationService,
    OrganizationRepository,
    HistoryRepository,
    PlanRepository,
  ],
  controllers: [OrganizationController],
})
export class OrganizationModule {}
