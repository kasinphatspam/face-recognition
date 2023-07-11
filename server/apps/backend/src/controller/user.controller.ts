import { Controller, Get, Post, Put, Delete, Body , Res } from '@nestjs/common';
import { UserService } from '../service/user.service';

@Controller('user')
export class UserController {

  constructor(private readonly service: UserService) {}

  @Get('me')
  public getCurrentUser(): string {
    return
  }

  @Get('all')
  public getAllUser(): string {
    return
  }

  @Get()
  public get(): string {
    return
  }

  @Put()
  public update(): string {
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