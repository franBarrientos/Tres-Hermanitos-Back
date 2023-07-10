import { IsNotEmpty, IsOptional, Length } from "class-validator";
import { BaseDto } from "../config/base.dto";
import { Product } from "../product/product.entity";
import { Purchase } from "./purchase.entity";

export class PurchasesProductsDto extends BaseDto {
  @IsNotEmpty()
  quantity!: number;

  @IsOptional()
  totalPrice!: number;

  @IsNotEmpty()
  purchase!: Purchase;

  @IsNotEmpty()
  product!: Product;
}
