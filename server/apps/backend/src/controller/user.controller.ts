import { Controller, Get, Post, Put, Delete, Body, HttpStatus, Res } from '@nestjs/common';
import { Response } from 'express';
import { UserService } from '../service/user.service';
import { DeleteUserDto, GetUserByIdDto, UpdateUserDto, UpdateUserImageDto } from 'src/utils/dtos/user.dto';

@Controller('user')
export class UserController {

  constructor(private readonly userService: UserService) {}

  @Get('me')
  public async getCurrentUser() {
    return this.userService.getCurrentUser()
  }

  @Get('all')
  public getAllUser() {
    return this.userService.getAllUser()
  }

  @Get()
  public getUserById(@Body() body: GetUserByIdDto) {
    return this.userService.getUserById(body)
  }

  @Put()
  public async update(@Body() body: UpdateUserDto, @Res() res: Response) {
    await this.userService.update(body)
    return res.status(HttpStatus.OK).json({msg: "Update user information successfully"})
  }

  @Put('image')
  public async updateUserImage(@Body() body: UpdateUserImageDto, @Res() res: Response) {
    await this.userService.updateImage(body)
    return res.status(HttpStatus.OK).json({msg: "Update user image successfully"})
  }

  @Delete()
  public async delete(@Body() body: DeleteUserDto, @Res() res: Response) {
    await this.userService.delete(body)
    return res.status(HttpStatus.OK).json({msg: "Delete user account successfully"})
  }

}