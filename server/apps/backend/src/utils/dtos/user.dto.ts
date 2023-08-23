import { Type } from 'class-transformer';
import {
  IsBase64,
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

class UpdateUserDto {
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @MaxLength(30)
  public firstname: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @MaxLength(30)
  public lastname: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @MaxLength(10)
  public gender: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
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

  @IsOptional()
  @IsNumber()
  public organizationId: number;

  @IsOptional()
  @IsNumber()
  public roleId: number;
}

class UpdateUserImageDto {
  @IsNotEmpty()
  @IsBase64()
  public image: string;
}

export { UpdateUserDto, UpdateUserImageDto };
