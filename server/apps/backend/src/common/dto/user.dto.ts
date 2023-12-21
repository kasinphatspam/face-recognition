import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsDate,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

class CreateUserDto {
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
}

class UpdateUserDto {
  @ApiProperty()
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @MaxLength(30)
  public firstname?: string;

  @ApiProperty()
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @MaxLength(30)
  public lastname?: string;

  @ApiProperty()
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @MaxLength(10)
  public gender?: string;

  @ApiProperty()
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @MinLength(7)
  @MaxLength(13)
  public personalId?: string;

  @ApiProperty()
  @IsOptional()
  @Type(() => Date)
  @IsDate()
  public dob?: Date;

  @ApiProperty()
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  public image?: string;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  public organizationId?: number;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  public roleId?: number;
}

export { CreateUserDto, UpdateUserDto };
