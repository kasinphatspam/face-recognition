import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

class CreateNewRoleDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  public roleName: string;
}

class EditRoleDto {
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  public roleName: string;
}

export { CreateNewRoleDto, EditRoleDto };
