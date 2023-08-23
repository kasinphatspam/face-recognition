import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

class CreateNewRoleDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(30)
  public name: string;

  @IsOptional()
  @IsNumber()
  public organizationId: number;
}

class EditRoleDto {
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @MaxLength(30)
  public name: string;
}

export { CreateNewRoleDto, EditRoleDto };
