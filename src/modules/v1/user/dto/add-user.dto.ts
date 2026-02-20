import { Transform } from 'class-transformer';
import { IsBoolean, IsEmail, IsEnum, IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { ERole } from 'src/common/enums/role.enum';

export class AddUserDto {
  @IsEmail({}, { message: 'Debe ser un correo válido' })
  @IsNotEmpty()
  @MaxLength(100, { message: 'El correo no puede exceder los 100 caracteres' })
  @Transform(({ value }) => value?.toLowerCase().trim())
  email: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(60, { message: 'La contraseña no puede exceder los 60 caracteres' })
  password: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(100, { message: 'El nombre no puede exceder los 100 caracteres' })
  firstName: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(100, { message: 'El apellido no puede exceder los 100 caracteres' })
  lastName: string;

  @IsNotEmpty()
  @Transform(({ value }) => value?.toUpperCase().trim())
  @IsEnum(ERole, {
    message: `El rol debe ser uno de los siguientes: ${Object.values(ERole).join(', ')}`,
  })
  role: ERole;

  @IsBoolean()
  @IsNotEmpty()
  isActive: boolean;
}
