import {
  Controller,
  Post,
  Put,
  Body,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import {
  AuthForgotPasswordDto,
  AuthLoginDto,
  AuthRegisterDto,
} from '@/utils/dtos/auth.dto';
import { AuthService } from '@/service/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  public async login(@Body() body: AuthLoginDto, @Res() res: Response) {
    const user = await this.authService.login(body);
    return res.status(HttpStatus.OK).json({
      message: `Login account id: ${user.id}is sucessfully.`,
      user: user,
    });
  }

  @Post('register')
  public async register(@Body() body: AuthRegisterDto, @Res() res: Response) {
    const user = await this.authService.register(body);
    return res.status(HttpStatus.OK).json({
      message: `Create account id: ${user.id}is successfully.`,
      user: user,
    });
  }

  @Put('forgot-password')
  public async forgotPassword(
    @Body() body: AuthForgotPasswordDto,
    @Res() res: Response,
  ) {
    await this.authService.forgotPassword(body);
    return;
  }
}
