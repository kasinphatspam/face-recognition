import { Module } from '@nestjs/common';
import { UploadController } from '@/controller/upload.controller';
import {
  DoSpacesServiceProvider,
  UploadService,
} from '@/service/upload.service';
import { AuthModule } from '@/module/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [UploadController],
  providers: [UploadService, DoSpacesServiceProvider],
})
export class UploadModule {}
