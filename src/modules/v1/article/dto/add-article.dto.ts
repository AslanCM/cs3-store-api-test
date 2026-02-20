import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
} from 'class-validator';

export class AddArticleDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  sku: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(200)
  name: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsNotEmpty()
  @IsNumber({ allowNaN: false, allowInfinity: false, maxDecimalPlaces: 2 })
  @Min(0)
  @Max(9999999999.99)
  unitPrice: number;

  @IsOptional()
  @IsNumber({ allowNaN: false, allowInfinity: false, maxDecimalPlaces: 0 })
  @Min(0)
  wholesaleQuantity: number;

  @IsOptional()
  @IsNumber({ allowNaN: false, allowInfinity: false, maxDecimalPlaces: 2 })
  @Min(0)
  @Max(999.99)
  wholesalePrice: number;

  @IsNotEmpty()
  @IsNumber({ allowNaN: false, allowInfinity: false, maxDecimalPlaces: 0 })
  @Min(0)
  stock: number;

  @IsNotEmpty()
  @IsBoolean()
  isActive: boolean;
}
