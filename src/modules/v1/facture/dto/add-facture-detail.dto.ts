import { IsInt, IsNotEmpty, IsUUID, Min } from "class-validator";

export class AddFactureDetailDto {
  @IsUUID()
  @IsNotEmpty()
  articleId: string;

  @IsInt({ message: 'La cantidad debe ser un número entero' })
  @Min(1, { message: 'La cantidad mínima es 1' })
  @IsNotEmpty()
  quantity: number;
}
