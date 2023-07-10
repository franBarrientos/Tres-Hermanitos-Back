import { IsNotEmpty, IsOptional, Length } from "class-validator";
import { BaseDto } from "../config/base.dto";
import { Category } from "../category/category.entity";
import { Customer } from "../customer/customer.entity";

export class PurchaseDto extends BaseDto {
  @IsNotEmpty()
  @Length(1, 50)
  state!:string

  @IsNotEmpty()
  @Length(1, 50)
  payment!:string

  @IsNotEmpty()
  customer!:Customer

}
