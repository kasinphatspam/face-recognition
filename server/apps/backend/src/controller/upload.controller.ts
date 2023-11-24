import { UploadService } from '@/service/upload.service';
import { EncodeContactImageDto } from '@/utils/dtos/contact.dto';
import {
  Body,
  Controller,
  FileTypeValidator,
  HttpStatus,
  MaxFileSizeValidator,
  ParseFilePipe,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';

@Controller('upload')
export class UploadController {
  public constructor(private readonly uploadService: UploadService) {}

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  public async test(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 10 * 10e6 }),
          new FileTypeValidator({ fileType: 'image/*' }),
        ],
        fileIsRequired: false,
      }),
    )
    file: Express.Multer.File,
    @Body() body: EncodeContactImageDto,
    @Res() res: Response,
  ) {
    console.log(file);
    if (!file && !body.image) {
      return res.status(404).json({ message: 'File not found' });
    }

    const form = new FormData();
    form.append(
      'image',
      new Blob([file.buffer], { type: file.mimetype }),
      file.originalname,
    );
    return res.status(HttpStatus.OK).json({ message: `Send Success` });
  }
}
