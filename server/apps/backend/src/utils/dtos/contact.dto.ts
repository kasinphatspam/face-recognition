import { Type } from 'class-transformer';
import {
  ArrayNotEmpty,
  IsArray,
  IsBase64,
  IsDate,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPhoneNumber,
  IsString,
  MaxLength,
} from 'class-validator';

class CreateNewContactDto {
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
  @MaxLength(60)
  public company: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @MaxLength(30)
  public title: string;

  @IsOptional()
  @IsPhoneNumber('TH')
  public officePhone: string;

  @IsOptional()
  @IsPhoneNumber('TH')
  public mobile: string;

  @IsOptional()
  @IsEmail()
  public email1: string;

  @IsOptional()
  @IsEmail()
  public email2: string;

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  public dob: Date;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @MaxLength(60)
  public owner: string;

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  public createdTime: Date;

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  public modifiedTime: Date;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @MaxLength(30)
  public lineId: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  public facebook: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  public linkedin: string;
}

class EncodeContactImageDto {
  @IsOptional()
  @IsNotEmpty()
  @IsBase64()
  public image?: string;
}

class EncodeImageResponseDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  public encodedId: string;

  public statusCode: number;

  public liveness: boolean;
}

class RecognitionImageResponseDto {
  @IsNotEmpty()
  @IsString()
  public id: string;

  @IsNotEmpty()
  @IsNumber()
  public statusCode: number;

  @IsArray()
  @ArrayNotEmpty()
  public accuracy: Float32Array;

  @Type(() => Date)
  @IsDate()
  public checkedTime: Date;

  constructor(
    id: string,
    statusCode: number,
    accuracy: Float32Array,
    checkedTime: Date,
  ) {
    this.id = id;
    this.statusCode = statusCode;
    this.accuracy = accuracy;
    this.checkedTime = checkedTime;
  }
}

class CreatePackageResponseDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(8)
  public packageKey: string;
}

export {
  CreateNewContactDto,
  EncodeContactImageDto,
  EncodeImageResponseDto,
  RecognitionImageResponseDto,
  CreatePackageResponseDto,
};
