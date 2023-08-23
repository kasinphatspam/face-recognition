import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

class CreatePermissionDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(40)
  public title: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  public description: string;
}

class EditPermissionDto {
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @MaxLength(40)
  public title: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  public description: string;
}

export { CreatePermissionDto, EditPermissionDto };
