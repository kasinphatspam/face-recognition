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
  public contactCompany: string;

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
  public contactOwner: string;

  @Type(() => Date)
  @IsDate()
  public createdTime: Date;

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

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  public encodedId: string;

  @IsNotEmpty()
  @IsBase64()
  public image: string;

  @IsOptional()
  @IsNumber()
  public organizationId: number;
}

class EncodeContactImageDto {
  @IsNotEmpty()
  @IsBase64()
  public image: string;
}

class EncodeImageResponseDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  public encodedId: string;
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
