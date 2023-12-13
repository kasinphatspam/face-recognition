import { Module } from '@nestjs/common';
import { UploadController } from '@/common/controllers/upload.controller';
import {
  DoSpacesServiceProvider,
  UploadService,
} from '@/common/services/upload.service';
import { AuthModule } from '@/auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [UploadController],
  providers: [UploadService, DoSpacesServiceProvider],
})
export class UploadModule {}
