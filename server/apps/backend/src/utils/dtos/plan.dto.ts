import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  Min,
} from 'class-validator';

class PlanCreateDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(20)
  public title: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  public cost: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  public limitEmployee: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  public limitContact: number;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  public feature?: string;
}

class PlanEditDto {
  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  public cost?: number;

  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  public limitEmployee?: number;

  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  public limitContact?: number;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  public feature?: string;
}

export { PlanCreateDto, PlanEditDto };
