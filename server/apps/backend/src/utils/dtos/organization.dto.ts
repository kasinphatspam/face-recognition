import {
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  MaxLength,
} from 'class-validator';

class CreateOrganizationDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(30)
  public name: string;
}

class UpdateOrganizationDto {
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @MaxLength(30)
  public name: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @Length(6)
  public passcode: string;

  @IsOptional()
  @IsNotEmpty()
  @IsDate()
  public codeCreatedTime: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @MaxLength(30)
  public vtigerToken: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @MaxLength(30)
  public vtigerAccessKey: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  public vtigerLink: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @Length(8)
  public packageKey: string;

  @IsOptional()
  @IsBoolean()
  public isPublic: boolean;
}

export { CreateOrganizationDto, UpdateOrganizationDto };
