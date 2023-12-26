import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import entities from '@/common/entities';
import { AuthModule } from '@/auth/auth.module';
import { SearchController } from '@/common/controllers/search.controller';
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
  controllers: [SearchController],
})
export class SearchModule {}
