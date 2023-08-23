import { Type } from 'class-transformer';
import {
  IsDate,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

class CreateOrganizationDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  public organizationName: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  public organizationCode: string;

  @Type(() => Date)
  @IsDate()
  public codeExpiredTime: Date;

  @Type(() => Date)
  @IsDate()
  public codeCreatedTime: Date;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  public vtigerToken: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  public vtigerAccessKey: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  public packageKey: string;
}

class UpdateOrganizationDto {
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  public organizatioName: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  public organizationCode: string;

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  public codeExpiredTime: Date;

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  public codeCreatedTime: Date;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  public vtigerToken: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  public vtigerAccessKey: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  public packageKey: string;
}

export { CreateOrganizationDto, UpdateOrganizationDto };
