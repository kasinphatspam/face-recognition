import { Module } from '@nestjs/common';
import { ImageController } from '@/common/controllers/image.controller';
import { ImageService } from '@/common/services/image.service';

@Module({
  controllers: [ImageController],
  providers: [ImageService],
})
export class ImageModule {}
