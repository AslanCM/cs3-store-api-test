import { IsEmail, IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { Transform } from "class-transformer";

export class AddOrganizationDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(200, { message: 'El nombre no puede exceder los 200 caracteres' })
  name: string;

  @IsEmail({}, { message: 'Debe ser un correo válido' })
  @IsNotEmpty()
  @MaxLength(50)
  @Transform(({ value }) => value?.toLowerCase().trim())
  email: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  phone: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(40)
  documentNumber: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(400)
  address: string;
}
