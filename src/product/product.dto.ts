import { IsNotEmpty, IsOptional, Length } from "class-validator";
import { BaseDto } from "../config/base.dto";
import { Category } from "../category/category.entity";

export class ProductDto extends BaseDto {
  @IsNotEmpty()
  @Length(1, 50)
  name!: string;

  @IsNotEmpty()
  @Length(1, 50)
  description!: string;

  @IsNotEmpty()
  @Length(1, 125)
  img!: string;

  @IsNotEmpty()
  price!: number;

  @IsNotEmpty()
  category!: Category;
}
