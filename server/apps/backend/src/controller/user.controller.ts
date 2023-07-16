import { Controller, Get, Post, Put, Delete, Body , Res } from '@nestjs/common';
import { UserService } from '../service/user.service';
import { GetUserByIdDto, UpdateUserDto } from 'src/utils/dtos/user.dto';

@Controller('user')
export class UserController {

  constructor(private readonly userService: UserService) {}

  @Get('me')
  public async getCurrentUser() {
    return this.userService.getCurrentUser()
  }

  @Get('all')
  public getAllUser(): string {
    return
  }

  @Get()
  public getUserById(@Body() body: GetUserByIdDto): string {
    return
  }

  @Put()
  public update(@Body() body: UpdateUserDto): string {
    return
  }

  @Delete()
  public delete(): string {
    return
  }

  @Put('profile')
  public updateUserProfile(): string {
    return
  }

}