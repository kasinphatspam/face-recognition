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

  /* 
    Service name:  Authentication login
    Url: http://localhost:3001/auth/login
    Method: POST
    Body: { "email":"", "password":"" }
  */
  @Post('login')
  public async login(@Body() body: AuthLoginDto, @Res() res: Response) {
    const jwt = await this.authService.login(body);

    res.cookie('jwt', jwt, { httpOnly: true });
    return res.status(HttpStatus.OK).json({
      message: `Login sucessfully.`,
    });
  }

  /* 
    Service name:  Authentication Register
    Url: http://localhost:3001/auth/register
    Method: POST
    Body: { "email":"", "password":"", "firstname":"", "lastname":"", "gender":"", "personalId":"", "dob":"", "image":"" }
  */
  @Post('register')
  public async register(@Body() body: AuthRegisterDto, @Res() res: Response) {
    const user = await this.authService.register(body);
    return res.status(HttpStatus.OK).json({
      message: `Create account id: ${user.id}is successfully.`,
      user: user,
    });
  }

  /* 
    Service name:  Authentication get current user (for website only)
    Url: http://localhost:3001/auth/me
    Method: GET
    Body: {}
  */
  @Get('me')
  public async me(@Req() req: Request, @Res() res: Response) {
    const data = await this.authService.me(req);

    return res.status(HttpStatus.OK).json(data);
  }

  /* 
    Service name:  Authentication logout (for website only)
    Url: http://localhost:3001/auth/logout
    Method: GET
    Body: {}
  */
  @Get('logout')
  public async logout(@Res() res: Response) {
    res.clearCookie('jwt');

    return res.status(HttpStatus.OK).json({ msg: 'logout success' });
  }

  /* 
    Service name:  Authentication forgot password
    Url: http://localhost:3001/auth/forgot-password
    Method: GET
    Body: { "email":"" }
  */
  @Put('forgot-password')
  public async forgotPassword(
    @Body() body: AuthForgotPasswordDto,
    @Res() res: Response,
  ) {
    await this.authService.forgotPassword(body);
    return res.status(HttpStatus.OK).json({ message: 'Forgot password' });
  }

  @Post('forgot-password/verify')
  public async verifyForgotPasswordRequest(){
    
  }

  @Put('change-password/wc')
  public async changePasswordWithConfirmation(){

  }

  @Put('change-password/woc')
  public async changePasswordWithoutConfirmation(){

  }
}
