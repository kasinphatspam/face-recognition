import { Type } from 'class-transformer';
import {
  IsDate,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
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
  @MinLength(7)
  @MaxLength(13)
  public personalId: string;

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  public dob: Date;
}

export { UpdateUserDto };
