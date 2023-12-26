import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from '@/app.controller';
import { AuthModule } from '@/auth/auth.module';
import { UserModule } from '@/users/user.module';
import * as dotenv from 'dotenv';
import entities from '@/common/entities';
import { OrganizationModule } from '@/organizations/organization.module';
import { ImageModule } from '@/common/modules/image.module';
import { ScheduleModule } from '@nestjs/schedule';
import { TaskModule } from './common/modules/task.module';
import { CacheModule } from '@nestjs/cache-manager';
import { PlanModule } from '@/common/modules/plan.module';
import { UploadModule } from '@/common/modules/upload.module';
import { APP_GUARD, RouterModule } from '@nestjs/core';
import { ServiceGuard } from '@/common/guards/service.guard';
import { ContactModule } from '@/contacts/contact.module';
import { EmployeeModule } from '@/employees/employee.module';
import { RoleModule } from '@/roles/role.module';
import { SearchModule } from '@/common/modules/search.module';

dotenv.config();
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'mysql',
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT) || 3306,
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        entities: entities,
        synchronize: true,
        logging: false,
        ssl: true,
      }),
    }),
    CacheModule.register({ isGlobal: true }),
    ScheduleModule.forRoot(),
    RouterModule.register([
      {
        path: 'organizations',
        module: OrganizationModule,
        children: [
          {
            path: 'info/contacts',
            module: ContactModule,
          },
          {
            path: 'info/employees',
            module: EmployeeModule,
          },
          {
            path: 'info/roles',
            module: RoleModule,
          },
        ],
      },
    ]),
    AuthModule,
    UserModule,
    EmployeeModule,
    RoleModule,
    OrganizationModule,
    ContactModule,
    ImageModule,
    TaskModule,
    PlanModule,
    UploadModule,
    SearchModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ServiceGuard,
    },
  ],
})
export class AppModule {}
