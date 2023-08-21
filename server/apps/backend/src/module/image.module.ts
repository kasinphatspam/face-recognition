import { Module } from '@nestjs/common';
import { ImageController } from 'src/controller/image.controller';
import { ImageService } from 'src/service/image.service';

@Module({
  controllers: [ImageController],
  providers: [ImageService],
})
export class ImageModule {}
