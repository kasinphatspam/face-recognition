import { Injectable } from '@nestjs/common';
import { AuthForgotPasswordDto, AuthLoginDto, AuthRegisterDto } from 'src/utils/dtos/auth.dto';

@Injectable()
export class AuthService {


  public login(body: AuthLoginDto) {
    const email = body.email
    const password = body.password
    return
  }

  public register(body: AuthRegisterDto) {
    return
  }

  public forgot_password(body: AuthForgotPasswordDto) {
    return
  }

}