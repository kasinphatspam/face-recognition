import { Controller, Get, HttpStatus, Param, Res } from '@nestjs/common';
import { Response } from 'express';
import { Folder, ImageService } from 'src/service/image.service';

@Controller('images')
export class ImageController {
  public constructor(private readonly imageService: ImageService) {}

   /* 
    Service name:  Get Image By path
    Url: http://localhost:3001/:folder/:file
    Method: Get
    Body: {}
  */
  @Get(':folder/:file')
  public async getImagePath(
    @Param('folder') folder: Folder,
    @Param('file') file: string,
    @Res() res: Response,
  ) {
    return res
      .status(HttpStatus.OK)
      .sendFile(this.imageService.getImagePath(folder, file));
  }
}
