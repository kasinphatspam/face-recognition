import { ApiProperty } from '@nestjs/swagger';
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
import { Contact } from '@/common/entities';

class CreateNewContactDto {
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
  @MaxLength(60)
  public company: string;

  @ApiProperty()
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @MaxLength(30)
  public title: string;

  @ApiProperty()
  @IsOptional()
  @IsPhoneNumber('TH')
  public officePhone: string;

  @ApiProperty()
  @IsOptional()
  @IsPhoneNumber('TH')
  public mobile: string;

  @ApiProperty()
  @IsOptional()
  @IsEmail()
  public email1: string;

  @ApiProperty()
  @IsOptional()
  @IsEmail()
  public email2: string;

  @ApiProperty()
  @IsOptional()
  @Type(() => Date)
  @IsDate()
  public dob: Date;

  @ApiProperty()
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @MaxLength(60)
  public owner: string;

  @ApiProperty()
  @IsOptional()
  @Type(() => Date)
  @IsDate()
  public createdTime: Date;

  @ApiProperty()
  @IsOptional()
  @Type(() => Date)
  @IsDate()
  public modifiedTime: Date;

  @ApiProperty()
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @MaxLength(30)
  public lineId: string;

  @ApiProperty()
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  public facebook: string;

  @ApiProperty()
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  public linkedin: string;
}

class UpdateContactDto {
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
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @MaxLength(60)
  public company?: string;

  @ApiProperty()
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @MaxLength(30)
  public title?: string;

  @ApiProperty()
  @IsOptional()
  @IsPhoneNumber('TH')
  public officePhone?: string;

  @ApiProperty()
  @IsOptional()
  @IsPhoneNumber('TH')
  public mobile?: string;

  @ApiProperty()
  @IsOptional()
  @IsEmail()
  public email1?: string;

  @ApiProperty()
  @IsOptional()
  @IsEmail()
  public email2?: string;

  @ApiProperty()
  @IsOptional()
  @Type(() => Date)
  @IsDate()
  public dob?: Date;

  @ApiProperty()
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @MaxLength(60)
  public owner?: string;

  @ApiProperty()
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @MaxLength(30)
  public lineId?: string;

  @ApiProperty()
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  public facebook?: string;

  @ApiProperty()
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  public linkedin?: string;

  @ApiProperty()
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  public encodedId?: string;

  @ApiProperty()
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  public image?: string;
}

class EncodeContactImageDto {
  @ApiProperty()
  @IsOptional()
  @IsNotEmpty()
  @IsBase64()
  public image?: string;
}

class EncodeImageResponseDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  public encodedId: string;

  @ApiProperty()
  public statusCode: number;

  @ApiProperty()
  public liveness: boolean;
}

class RecognitionImageResponseDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  public id: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  public statusCode: number;

  @ApiProperty()
  @IsArray()
  @ArrayNotEmpty()
  public accuracy: number;

  @ApiProperty()
  @Type(() => Date)
  @IsDate()
  public checkedTime: Date;

  constructor(
    id: string,
    statusCode: number,
    accuracy: number,
    checkedTime: Date,
  ) {
    this.id = id;
    this.statusCode = statusCode;
    this.accuracy = accuracy;
    this.checkedTime = checkedTime;
  }
}

class CreatePackageResponseDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MaxLength(8)
  public packageKey: string;
}

type RecognitionImageResponseJson = {
  accuracy: number[];
  statusCode: number;
  result: Contact[];
};

export {
  CreateNewContactDto,
  UpdateContactDto,
  EncodeContactImageDto,
  EncodeImageResponseDto,
  RecognitionImageResponseDto,
  CreatePackageResponseDto,
  RecognitionImageResponseJson,
};
