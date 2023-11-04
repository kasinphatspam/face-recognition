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
    const result = await this.authService.login(body);

    res.cookie('jwt', result.jwt, { httpOnly: true });
    return res.status(HttpStatus.OK).json({
      message: `Login sucessfully.`,
      id: result.id,
    });
  }

  @Post('register')
  public async register(@Body() body: AuthRegisterDto, @Res() res: Response) {
    const user = await this.authService.register(body);
    return res.status(HttpStatus.OK).json({
      message: `Create account id: ${user.id} is successfully.`,
      user: user,
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

    return res.status(HttpStatus.OK).json({ msg: 'logout success' });
  }

  @Put('forgot-password')
  public async forgotPassword(
    @Body() body: AuthForgotPasswordDto,
    @Res() res: Response,
  ) {
    await this.authService.forgotPassword(body);
    return res.status(HttpStatus.OK).json({ message: 'Forgot password' });
  }

  @Post('forgot-password/verify')
  public async verifyForgotPasswordRequest() {
    return;
  }

  @Put('change-password/wc')
  public async changePasswordWithConfirmation() {
    return;
  }

  @Put('change-password/woc')
  public async changePasswordWithoutConfirmation() {
    return;
  }
}
