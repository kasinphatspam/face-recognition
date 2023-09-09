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

  /* 
    Service name:  Get list of user
    Url: http://localhost:3001/user/list/all
    Method: GET
    Body: {}
  */
  @Get('list/all')
  public getAllUser() {
    return this.userService.getAllUser();
  }

  /* 
    Service name:  Get user by id
    Url: http://localhost:3001/user/:userId
    Method: GET
    Body: {}
  */
  @Get(':userId')
  public getUserById(@Param('userId') userId: number) {
    return this.userService.getUserById(userId);
  }

  /* 
    Service name:  Update user info with user id
    Url: http://localhost:3001/user/:userId
    Method: PUT
    Body: {}
  */
  @Put(':userId')
  public async update(
    @Param('userId') userId: number,
    @Body() body: UpdateUserDto,
    @Res() res: Response,
  ) {
    await this.userService.updateUserInfo(userId, body);
    return res.status(HttpStatus.OK).json({
      message: 'Update user information successfully',
    });
  }

  /* 
    Service name:  Update user profile with user id
    Url: http://localhost:3001/user/:userId/image
    Method: PUT
    Body: {}
  */
  @Put(':userId/image')
  public async updateUserImage(
    @Param('userId') userId: number,
    @Body() body: UpdateUserImageDto,
    @Res() res: Response,
  ) {
    await this.userService.updateImage(userId, body);
    return res.status(HttpStatus.OK).json({
      message: 'Update user image successfully',
    });
  }

  /* 
    Service name:  Delete user account
    Url: http://localhost:3001/user/:userId
    Method: DELETE
    Body: {}
  */
  @Delete(':userId')
  public async delete(@Param('userId') userId: number, @Res() res: Response) {
    await this.userService.deleteUserAccount(userId);
    return res.status(HttpStatus.OK).json({
      message: 'Delete user account successfully',
    });
  }

  /* 
    Service name:  Get current organization
    Url: http://localhost:3001/user/:userId/organization
    Method: GET
    Body: {}
  */
  @Get(':userId/organization')
  public async getCurrentOrganization(
    @Param('userId') userId: number,
    @Res() res: Response,
  ) {
    const organization = await this.organizationService.getCurrentOrganization(
      userId,
    );
    return res.status(HttpStatus.OK).json({ organization });
  }
}
