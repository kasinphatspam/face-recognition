import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

class CreateNewRoleDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MaxLength(30)
  public name: string;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  public organizationId: number;
}

class EditRoleDto {
  @ApiProperty()
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @MaxLength(30)
  public name: string;
}

export { CreateNewRoleDto, EditRoleDto };
