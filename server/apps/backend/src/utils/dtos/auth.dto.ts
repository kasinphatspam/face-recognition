import {
  IsBase64,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

class AuthLoginDto {
  @IsEmail()
  @MaxLength(50)
  public email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  @MaxLength(30)
  public password: string;
}

class AuthLoginResult {
  public id: number;
  public jwt: string;
}

class AuthRegisterDto {
  @IsEmail()
  @MaxLength(50)
  public email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  @MaxLength(30)
  public password: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(30)
  public firstname: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(30)
  public lastname: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @MaxLength(10)
  public gender: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(7)
  @MaxLength(13)
  public personalId: string;

  @IsOptional()
  @IsNotEmpty()
  @IsBase64()
  public image: string;
}

class AuthForgotPasswordDto {
  @IsEmail()
  @MaxLength(50)
  public email: string;
}

class AuthVerifyResetPassword {
  @MinLength(6)
  @MaxLength(6)
  public code: string;

  @IsEmail()
  @MaxLength(50)
  public email: string;
}

class AuthChangePasswordWithConfirmation {
  public id: number;

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  @MaxLength(30)
  public oldPassword: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  @MaxLength(30)
  public password: string;
}

class AuthChangePasswordWithOutConfirmation {
  public id: number;

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  @MaxLength(30)
  public password: string;
}

export {
  AuthLoginDto,
  AuthLoginResult,
  AuthRegisterDto,
  AuthForgotPasswordDto,
  AuthVerifyResetPassword,
  AuthChangePasswordWithConfirmation,
  AuthChangePasswordWithOutConfirmation,
};
