import { AuthModule } from '@/auth/auth.module';
import { ContactService } from '@/contacts/contact.service';
import entities from '@/common/entities';
import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContactController } from './contact.controller';
import { ContactRepository } from '@/contacts/contact.repository';
import { RecognitionService } from '@/contacts/recognition.service';
import { UserModule } from '@/users/user.module';
import { OrganizationModule } from '@/organizations/organization.module';

@Module({
  imports: [
    TypeOrmModule.forFeature(entities),
    AuthModule,
    forwardRef(() => UserModule),
    forwardRef(() => OrganizationModule),
  ],
  providers: [ContactService, ContactRepository, RecognitionService],
  controllers: [ContactController],
  exports: [ContactService, ContactRepository, RecognitionService],
})
export class ContactModule {}
