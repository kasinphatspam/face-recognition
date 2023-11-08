import {
  Controller,
  Get,
  Put,
  Delete,
  Body,
  HttpStatus,
  Res,
  Param,
} from '@nestjs/common';
import { Response } from 'express';
import { UserService } from '@/service/user.service';
import { UpdateUserImageDto, UpdateUserDto } from '@/utils/dtos/user.dto';
import { OrganizationService } from '@/service/organization.service';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly organizationService: OrganizationService,
  ) {}

  @Get('list/all')
  public findAll() {
    return this.userService.findAll();
  }

  @Get(':userId')
  public getUserById(@Param('userId') userId: number) {
    return this.userService.getUserById(userId);
  }

  @Put(':userId')
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
  public async updateImage(
    @Param('userId') userId: number,
    @Body() body: UpdateUserImageDto,
    @Res() res: Response,
  ) {
    await this.userService.updateImage(userId, body);
    return res.status(HttpStatus.OK).json({
      message: 'Update user image successfully',
    });
  }

  @Delete(':userId')
  public async delete(@Param('userId') userId: number, @Res() res: Response) {
    await this.userService.delete(userId);
    return res.status(HttpStatus.OK).json({
      message: 'Delete user account successfully',
    });
  }

  @Get(':userId/organization')
  public async getCurrentOrganization(@Param('userId') userId: number) {
    return await this.organizationService.getCurrentOrganization(userId);
  }
}
