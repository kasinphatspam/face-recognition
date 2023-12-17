import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Length,
  MaxLength,
} from 'class-validator';
import { Organization } from '../entities';

class CreateOrganizationDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MaxLength(30)
  public name: string;

  @ApiProperty()
  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  public planId: number;

  @ApiProperty()
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  passcode: string;

  @ApiProperty()
  @IsOptional()
  @IsNotEmpty()
  @IsDate()
  codeCreatedTime: Date;

  @ApiProperty()
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  packageKey: string;

  @ApiProperty()
  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  plan: number;
}

class UpdateOrganizationDto {
  @ApiProperty()
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @MaxLength(30)
  public name: string;

  @ApiProperty()
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @Length(6)
  public passcode: string;

  @ApiProperty()
  @IsOptional()
  @IsNotEmpty()
  @IsDate()
  public codeCreatedTime: string;

  @ApiProperty()
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @MaxLength(30)
  public vtigerToken: string;

  @ApiProperty()
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @MaxLength(30)
  public vtigerAccessKey: string;

  @ApiProperty()
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  public vtigerLink: string;

  @ApiProperty()
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @Length(8)
  public packageKey: string;

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  public isPublic: boolean;

  @ApiProperty()
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  public description: string;
}

class RequestJoinResponse {
  public organization: Organization;
  /* Request status code
   * 0: The user cannot join the organization directly because the organization is a private corporation.
   * 1: The user joined the organization successfully.
   */
  public type: number;
}

export { CreateOrganizationDto, UpdateOrganizationDto, RequestJoinResponse };
