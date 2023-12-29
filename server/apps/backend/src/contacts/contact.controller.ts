import { RequestUser } from '@/common/decorators/auth.decorator';
import { AuthGuard } from '@/common/guards/auth.guard';
import {
  Body,
  Controller,
  Delete,
  FileTypeValidator,
  Get,
  HttpStatus,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  Post,
  Put,
  Query,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import {
  CreateNewContactDto,
  EncodeContactImageDto,
} from '@/common/dto/contact.dto';
import { ContactService } from './contact.service';
import { User } from '@/common/entities';
import { ApiTags } from '@nestjs/swagger';

@ApiTags(`Customers contact`)
@Controller()
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Get()
  @UseGuards(AuthGuard)
  public async getAllContact(@Res() res: Response, @RequestUser() user: User) {
    const contacts = await this.contactService.findAll(user.organization.id);
    return res.status(HttpStatus.OK).json(contacts);
  }

  @Post('recognition')
  @UseGuards(AuthGuard)
  @UseInterceptors(FileInterceptor('image'))
  public async recognitionContactImage(
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
    @RequestUser() user: User,
    @Body() body: EncodeContactImageDto,
    @Res() res: Response,
  ) {
    const data = await this.contactService.recognitionImage(
      user.organization.id,
      user.id,
      body.image,
      file,
    );

    return res.status(HttpStatus.OK).json(data);
  }

  @Get('history')
  @UseGuards(AuthGuard)
  public async getContactsHistory(
    @RequestUser() user: User,
    @Query('date') date: string,
    @Res() res: Response,
  ) {
    const histories = await this.contactService.getContactsHistoryByOrgAndDate(
      user.organization,
      date,
    );
    return res.status(HttpStatus.OK).json(histories);
  }

  @Get(':contactId')
  public async getContactById(
    @Param('contactId') contactId: number,
    @Res() res: Response,
  ) {
    const contact = await this.contactService.getContactBy(contactId);

    return res.status(HttpStatus.OK).json(contact);
  }

  @Post()
  @UseGuards(AuthGuard)
  public async createNewContact(
    @RequestUser() user: User,
    @Body() body: CreateNewContactDto,
    @Res() res: Response,
  ) {
    const contactId = await this.contactService.createNewContact(
      user.organization.id,
      body,
    );

    return res
      .status(HttpStatus.OK)
      .json({ message: `Create contact ID: ${contactId} successfully` });
  }

  @Put(':contactId/encode')
  @UseGuards(AuthGuard)
  @UseInterceptors(FileInterceptor('image'))
  public async encodeContactImage(
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
    @RequestUser() user: User,
    @Param('contactId') contactId: number,
    @Body() body: EncodeContactImageDto,
    @Res() res: Response,
  ) {
    const encodedId = await this.contactService.encodeImage(
      user.organization,
      contactId,
      body.image,
      file,
    );
    return res
      .status(HttpStatus.OK)
      .json({ message: 'encode image successfully', encodedId: encodedId });
  }

  @Post('csv')
  @UseGuards(AuthGuard)
  @UseInterceptors(FileInterceptor('csv'))
  public async readCSV(
    @UploadedFile(
      new ParseFilePipe({
        validators: [new FileTypeValidator({ fileType: 'csv' })],
      }),
    )
    file: Express.Multer.File,
    @RequestUser() user: User,
    @Res() res: Response,
  ) {
    const data = await this.contactService.importFromCSV(file, user);
    return res.status(HttpStatus.OK).json({
      message: 'Add data from CSV file successfully',
      data,
    });
  }

  @Post('import/vtiger')
  public async importContactFromVtigerAPI(@Res() res: Response) {
    return res.status(HttpStatus.OK).json({});
  }

  @Delete(':contactId')
  @UseGuards(AuthGuard)
  public async deleteContactById(
    @Param('organizationId') organizationId: number,
    @Param('contactId') contactId: number,
    @Res() res: Response,
  ) {
    await this.contactService.deleteContact(organizationId, contactId);
    return res
      .status(HttpStatus.OK)
      .json({ message: 'Delete contact successfully' });
  }
}
