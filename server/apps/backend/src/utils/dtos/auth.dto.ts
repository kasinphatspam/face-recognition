import { Type } from 'class-transformer';
import {
  IsBase64,
  IsDate,
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
  @MinLength(13)
  @MaxLength(13)
  public personalId: string;

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  public dob: Date;

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

export { AuthLoginDto, AuthRegisterDto, AuthForgotPasswordDto };
