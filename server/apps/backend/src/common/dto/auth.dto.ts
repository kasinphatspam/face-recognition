import { ApiProperty } from '@nestjs/swagger';
import {
  IsBase64,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

class AuthResponse {
  @ApiProperty()
  public message: string;

  @ApiProperty()
  public session: string;
}

class AuthLoginDto {
  @ApiProperty()
  @IsEmail()
  @MaxLength(50)
  public email: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  @MaxLength(30)
  public password: string;
}

class AuthRegisterDto {
  @ApiProperty()
  @IsEmail()
  @MaxLength(50)
  public email: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  @MaxLength(30)
  public password: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MaxLength(30)
  public firstname: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MaxLength(30)
  public lastname: string;

  @ApiProperty()
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @MaxLength(10)
  public gender: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MinLength(7)
  @MaxLength(13)
  public personalId: string;

  @ApiProperty()
  @IsOptional()
  @IsNotEmpty()
  @IsBase64()
  public image: string;
}

class AuthForgotPasswordDto {
  @ApiProperty()
  @IsEmail()
  @MaxLength(50)
  public email: string;
}

class AuthVerifyResetPassword {
  @ApiProperty()
  @MinLength(6)
  @MaxLength(6)
  public code: string;

  @ApiProperty()
  @IsEmail()
  @MaxLength(50)
  public email: string;
}

class AuthChangePasswordWithConfirmation {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  @MaxLength(30)
  public oldPassword: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  @MaxLength(30)
  public password: string;
}

class AuthChangePasswordWithOutConfirmation {
  @ApiProperty()
  public id: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  @MaxLength(30)
  public password: string;
}

export {
  AuthResponse,
  AuthLoginDto,
  AuthRegisterDto,
  AuthForgotPasswordDto,
  AuthVerifyResetPassword,
  AuthChangePasswordWithConfirmation,
  AuthChangePasswordWithOutConfirmation,
};
