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
  @MaxLength(255)
  public firstname: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  public lastname: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  public organizationName: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  public title: string;

  @IsPhoneNumber('TH')
  public officePhone: string;

  @IsPhoneNumber('TH')
  public mobile: string;

  @IsEmail()
  public email: string;

  @IsOptional()
  @IsEmail()
  public alternateEmail: string;

  @Type(() => Date)
  @IsDate()
  public dob: Date;

  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  public contactOwner: string;

  @Type(() => Date)
  @IsDate()
  public createdTime: Date;

  @Type(() => Date)
  @IsDate()
  public modifiedTime: Date;

  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  public lineId: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  public facebook: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  public linkedin: string;
}

class EncodeContactImageDto {
  @IsNotEmpty()
  @IsBase64()
  public imageBase64: string;
}

class EncodeImageResponseDto {
  @IsNotEmpty()
  @IsString()
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
  public packageKey: string;
}

export {
  CreateNewContactDto,
  EncodeContactImageDto,
  EncodeImageResponseDto,
  RecognitionImageResponseDto,
  CreatePackageResponseDto,
};
