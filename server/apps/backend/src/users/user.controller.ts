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
import { UserService } from '@/users/user.service';
import { UpdateUserDto } from '@/common/dto/user.dto';
import { OrganizationService } from '@/organizations/services/organization.service';
import { AuthGuard } from '@/common/guards/auth.guard';
import { SelfGuard } from '@/common/guards/self.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { RequestUser } from '@/common/decorators/auth.decorator';
import { Organization, User } from '@/common/entities';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly organizationService: OrganizationService,
  ) {}

  @ApiOkResponse({
    description: 'Get all user',
    type: User,
    isArray: true,
  })
  @Get()
  @UseGuards(AuthGuard)
  public async findAll(@Res() res: Response) {
    const users = await this.userService.findAll();
    return res.status(HttpStatus.OK).json(users);
  }

  @ApiOkResponse({
    description: 'Get current organization',
    type: Organization,
  })
  @Get('organization')
  @UseGuards(AuthGuard)
  public async getCurrentOrganization(
    @RequestUser() user: User,
    @Res() res: Response,
  ) {
    const organization = await this.organizationService.getCurrentOrganization(
      user.id,
    );
    return res.status(HttpStatus.OK).json(organization);
  }

  @Get(':userId')
  @UseGuards(AuthGuard)
  public async getUserById(
    @Param('userId') userId: number,
    @Res() res: Response,
  ) {
    const user = await this.userService.getUserBy(userId, null);
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
      message:
        'Delete user account successfully. You can cancel before midnight today.',
    });
  }
}
