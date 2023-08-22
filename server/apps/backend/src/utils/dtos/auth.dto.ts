import { Type } from 'class-transformer';
import {
  IsBase64,
  IsDate,
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
} from 'class-validator';

class AuthLoginDto {
  @IsEmail()
  @MaxLength(255)
  public email: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  public password: string;
}

class AuthRegisterDto {
  @IsEmail()
  @MaxLength(255)
  public email: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  public password: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  public firstname: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  public lastname: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  public gender: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(13)
  public personalId: string;

  @Type(() => Date)
  @IsDate()
  public dob: Date;

  @IsNotEmpty()
  @IsBase64()
  public profileImage: string;
}

class AuthForgotPasswordDto {
  @IsEmail()
  @MaxLength(255)
  public email: string;
}

export { AuthLoginDto, AuthRegisterDto, AuthForgotPasswordDto };
