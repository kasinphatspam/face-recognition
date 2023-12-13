import {
  Controller,
  Post,
  Put,
  Body,
  Res,
  HttpStatus,
  Req,
  Get,
  UseGuards,
} from '@nestjs/common';
import { Request, Response } from 'express';
import {
  AuthChangePasswordWithConfirmation,
  AuthChangePasswordWithOutConfirmation,
  AuthForgotPasswordDto,
  AuthLoginDto,
  AuthRegisterDto,
  AuthResponse,
  AuthVerifyResetPassword,
} from '@/common/dto/auth.dto';
import { AuthService } from '@/auth/auth.service';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { User } from '@/common/entities';
import { AuthGuard } from '@/common/guards/auth.guard';
import { RequestUser } from '@/common/decorators/auth.decorator';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOkResponse({
    description: 'The user session uses for access services',
    type: AuthResponse,
  })
  @Post('login')
  public async login(@Body() body: AuthLoginDto, @Res() res: Response) {
    const jwt = await this.authService.login(body);

    res.cookie('jwt', jwt, { httpOnly: true });
    return res.status(HttpStatus.OK).json({
      message: `Login sucessfully.`,
      session: jwt,
    });
  }

  @ApiCreatedResponse({
    description: 'The user session uses for access services',
    type: AuthResponse,
  })
  @Post('register')
  public async register(@Body() body: AuthRegisterDto, @Res() res: Response) {
    const jwt = await this.authService.register(body);
    return res.status(HttpStatus.CREATED).json({
      message: `Create account is successfully.`,
      session: jwt,
    });
  }

  @ApiOkResponse({
    description: 'The current user details',
    type: User,
  })
  @Get('me')
  public async me(@Req() req: Request, @Res() res: Response) {
    const data = await this.authService.me(req);
    return res.status(HttpStatus.OK).json(data);
  }

  @ApiOkResponse({
    description:
      'Clear cookie (The client must clear the session (client-session) by itself)',
  })
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
  @UseGuards(AuthGuard)
  public async changePasswordWithConfirmation(
    @RequestUser() user: User,
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
