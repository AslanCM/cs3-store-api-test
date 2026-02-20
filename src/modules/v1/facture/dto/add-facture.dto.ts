import { Type } from 'class-transformer/types/decorators/type.decorator';
import {
  ArrayMinSize,
  IsArray,
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUUID,
  Max,
  MaxLength,
  Min,
  ValidateNested,
} from 'class-validator';
import { EFactureStatus } from 'src/common/enums/facture-status.enum';
import { AddFactureDetailDto } from './add-facture-detail.dto';

export class AddFactureDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  invoiceNumber: string;

  @IsNotEmpty()
  @Type(() => Date)
  @IsDate()
  date: Date;

  @IsNotEmpty()
  @Type(() => Date)
  @IsDate()
  expiredDate: Date;

  @IsUUID()
  @IsNotEmpty()
  clientId: string;

  @IsUUID()
  @IsNotEmpty()
  organizationId: string;

  @IsNotEmpty()
  @IsEnum(EFactureStatus, {
    message: `El estado de la factura debe ser uno de los siguientes: ${Object.values(EFactureStatus).join(', ')}`,
  })
  status: EFactureStatus;

  @IsNotEmpty()
  @IsNumber({ allowNaN: false, allowInfinity: false, maxDecimalPlaces: 2 })
  @Min(0)
  @Max(999999999999.99)
  totalAmount: number;

  @IsNotEmpty()
  @IsNumber({ allowNaN: false, allowInfinity: false, maxDecimalPlaces: 2 })
  @Min(0)
  @Max(999999999999.99)
  discount: number;

  @IsArray()
  @ArrayMinSize(1, { message: 'La factura debe contener al menos un detalle' })
  @ValidateNested({ each: true })
  @Type(() => AddFactureDetailDto)
  details: AddFactureDetailDto[];
}
