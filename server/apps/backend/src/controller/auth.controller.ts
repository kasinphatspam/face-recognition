import { Controller, Post, Put, Body, Res, HttpStatus } from '@nestjs/common';
import { AuthService } from '../service/auth.service';
import { AuthForgotPasswordDto, AuthLoginDto, AuthRegisterDto } from 'src/utils/dtos/auth.dto';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  public async login (@Body() body: AuthLoginDto, @Res() res: Response) {
    await this.authService.login(body)
    return res.status(HttpStatus.OK).json({msg: `Login successfully`})
  }

  @Post('register')
  public async register(@Body() body: AuthRegisterDto, @Res() res: Response) {
    await this.authService.register(body)
    return
  }

  @Put('forgot-password')
  public async forgotPassword(@Body() body: AuthForgotPasswordDto, @Res() res: Response) {
    await this.authService.forgot_password(body)
    return 
  }

}