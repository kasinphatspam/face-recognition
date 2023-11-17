import {
  Controller,
  Post,
  Put,
  Body,
  Res,
  HttpStatus,
  Req,
  Get,
} from '@nestjs/common';
import { Request, Response } from 'express';
import {
  AuthChangePasswordWithConfirmation,
  AuthChangePasswordWithOutConfirmation,
  AuthForgotPasswordDto,
  AuthLoginDto,
  AuthRegisterDto,
  AuthVerifyResetPassword,
} from '@/utils/dtos/auth.dto';
import { AuthService } from '@/service/auth.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  public async login(@Body() body: AuthLoginDto, @Res() res: Response) {
    const jwt = await this.authService.login(body);

    res.cookie('jwt', jwt, { httpOnly: true });
    return res.status(HttpStatus.OK).json({
      message: `Login sucessfully.`,
      session: jwt,
    });
  }

  @Post('register')
  public async register(@Body() body: AuthRegisterDto, @Res() res: Response) {
    const jwt = await this.authService.register(body);
    return res.status(HttpStatus.OK).json({
      message: `Create account is successfully.`,
      session: jwt,
    });
  }

  @Get('me')
  public async me(@Req() req: Request, @Res() res: Response) {
    const data = await this.authService.me(req);
    return res.status(HttpStatus.OK).json(data);
  }

  @Get('logout')
  public async logout(@Res() res: Response) {
    res.clearCookie('jwt');

    return res.status(HttpStatus.OK).json({ message: 'Logout successfully' });
  }

  @Put('forgot-password')
  public async forgotPassword(
    @Body() body: AuthForgotPasswordDto,
    @Res() res: Response,
  ) {
    await this.authService.forgotPassword(body);
    return res
      .status(HttpStatus.OK)
      .json({ message: `Send verification code to ${body.email}` });
  }

  @Post('forgot-password/verify')
  public async verifyForgotPasswordRequest(
    @Body() body: AuthVerifyResetPassword,
    @Res() res: Response,
  ) {
    await this.authService.verify(body);
    return res
      .status(HttpStatus.OK)
      .json({ message: 'Reset password request was accepted' });
  }

  @Put('change-password/wc')
  public async changePasswordWithConfirmation(
    @Body() body: AuthChangePasswordWithConfirmation,
    @Res() res: Response,
  ) {
    await this.authService.changePassword(body);
    return res
      .status(HttpStatus.OK)
      .json({ message: 'Reset password successfully' });
  }

  @Put('change-password/woc')
  public async changePasswordWithoutConfirmation(
    @Body() body: AuthChangePasswordWithOutConfirmation,
    @Res() res: Response,
  ) {
    await this.authService.changePasswordWithOutConfirmation(body);
    return res
      .status(HttpStatus.OK)
      .json({ message: 'Reset password successfully' });
  }
}
