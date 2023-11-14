import {
  Controller,
  Get,
  Put,
  Delete,
  Body,
  HttpStatus,
  Res,
  Param,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  ParseFilePipe,
  MaxFileSizeValidator,
  FileTypeValidator,
} from '@nestjs/common';
import { Response } from 'express';
import { UserService } from '@/service/user.service';
import { UpdateUserDto } from '@/utils/dtos/user.dto';
import { OrganizationService } from '@/service/organization.service';
import { AuthGuard } from '@/utils/guards/auth.guard';
import { SelfGuard } from '@/utils/guards/self.guard';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly organizationService: OrganizationService,
  ) {}

  @Get('list/all')
  @UseGuards(AuthGuard)
  public async findAll(@Res() res: Response) {
    const users = await this.userService.findAll();
    return res.status(HttpStatus.OK).json(users);
  }

  @Get(':userId')
  @UseGuards(AuthGuard)
  public async getUserById(
    @Param('userId') userId: number,
    @Res() res: Response,
  ) {
    const user = await this.userService.getUserById(userId);
    return res.status(HttpStatus.OK).json(user);
  }

  @Put(':userId')
  @UseGuards(AuthGuard, SelfGuard)
  public async update(
    @Param('userId') userId: number,
    @Body() body: UpdateUserDto,
    @Res() res: Response,
  ) {
    await this.userService.update(userId, body);
    return res.status(HttpStatus.OK).json({
      message: 'Update user information successfully',
    });
  }

  @Put(':userId/image')
  @UseGuards(AuthGuard, SelfGuard)
  @UseInterceptors(FileInterceptor('image'))
  public async updateImage(
    @Param('userId') userId: number,
    @Res() res: Response,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 10e6 }),
          new FileTypeValidator({ fileType: 'image/*' }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    await this.userService.updateImage(userId, file);
    return res.status(HttpStatus.OK).json({
      message: 'Update user image successfully',
    });
  }

  @Delete(':userId')
  @UseGuards(AuthGuard, SelfGuard)
  public async delete(@Param('userId') userId: number, @Res() res: Response) {
    await this.userService.delete(userId);
    return res.status(HttpStatus.OK).json({
      message: 'Delete user account successfully',
    });
  }

  @Get(':userId/organization')
  @UseGuards(AuthGuard)
  public async getCurrentOrganization(
    @Param('userId') userId: number,
    @Res() res: Response,
  ) {
    const organization = await this.organizationService.getCurrentOrganization(
      userId,
    );
    return res.status(HttpStatus.OK).json(organization);
  }
}
