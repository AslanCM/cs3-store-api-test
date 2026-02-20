import { Transform } from "class-transformer";
import { IsInt, IsNotEmpty, Max, Min } from "class-validator";

export class GetArticleDto {
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  @Max(500)
  @Transform(({ value }) => (Number.isNaN(Number(value)) ? 1 : Number(value)))
  page: number;

  @IsNotEmpty()
  @IsInt()
  @Min(1)
  @Max(100)
  @Transform(({ value }) => (Number.isNaN(Number(value)) ? 10 : Number(value)))
  limit: number;
}
