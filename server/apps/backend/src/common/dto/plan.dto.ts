import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  Min,
} from 'class-validator';

class PlanCreateDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MaxLength(20)
  public title: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  public cost: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  public limitEmployee: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  public limitContact: number;

  @ApiProperty()
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  public feature?: string;
}

class PlanEditDto {
  @ApiProperty()
  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  public cost?: number;

  @ApiProperty()
  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  public limitEmployee?: number;

  @ApiProperty()
  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  public limitContact?: number;

  @ApiProperty()
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  public feature?: string;
}

export { PlanCreateDto, PlanEditDto };
