import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

class CreateDepartmentDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  public departmentName: string;
}

class EditDepartmentDto {
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  public departmentName: string;
}

export { CreateDepartmentDto, EditDepartmentDto };
