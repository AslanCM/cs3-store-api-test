import { Transform } from 'class-transformer';
import { IsEmail, IsEnum, IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { EDocumentType } from 'src/common/enums/document-type.enum';

export class AddClientDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(200, { message: 'El nombre no puede exceder los 200 caracteres' })
  name: string;

  @IsNotEmpty()
  @IsEnum(DocumentType, {
    message: `El tipo de documento debe ser uno de los siguientes: ${Object.values(DocumentType).join(', ')}`,
  })
  documentType: EDocumentType;

  @IsString()
  @IsNotEmpty()
  @MaxLength(40)
  documentNumber: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(400)
  address: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  phone: string;

  @IsEmail({}, { message: 'Debe ser un correo válido' })
  @IsNotEmpty()
  @MaxLength(50)
  @Transform(({ value }) => value?.toLowerCase().trim())
  email: string;
}
