import { IsDate, IsOptional } from "class-validator";

export abstract class BaseDto {
  @IsOptional()
  id?: number;

  @IsOptional()
  @IsDate()
  createdAt?: Date;

  @IsOptional()
  @IsDate()
  updatedAt?: Date;
}
