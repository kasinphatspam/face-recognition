import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import entities from '@/common/entities';
import { AuthModule } from '@/auth/auth.module';
import { AdminController } from '@/admin/admin.controller';
import { UserModule } from '@/users/user.module';
import { OrganizationModule } from '@/organizations/organization.module';
import { ContactModule } from '@/contacts/contact.module';

@Module({
  imports: [
    TypeOrmModule.forFeature(entities),
    AuthModule,
    forwardRef(() => UserModule),
    forwardRef(() => ContactModule),
    forwardRef(() => OrganizationModule),
  ],
  controllers: [AdminController],
})
export class AdminModule {}
