import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from '@/controller/app.controller';
import { AppService } from '@/service/app.service';
import { AuthModule } from '@/module/auth.module';
import { UserModule } from '@/module//user.module';
import * as dotenv from 'dotenv';
import entities from '@/entity';
import { OrganizationModule } from '@/module/organization.module';
import { ImageModule } from '@/module/image.module';

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
      }),
    }),
    AuthModule,
    UserModule,
    OrganizationModule,
    ImageModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
