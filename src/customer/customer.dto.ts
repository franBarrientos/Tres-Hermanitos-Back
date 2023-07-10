import { IsEmail, IsNotEmpty, IsOptional, Length } from "class-validator";
import { BaseDto } from "../config/base.dto";
import User from "../user/user.entity";
import { Purchase } from "../purchase/purchase.entity";

export class CustomerDto extends BaseDto {
  @IsNotEmpty()
  @Length(2, 50)
  addres!: string;

  @IsNotEmpty()
  dni!: number;
  
  @IsNotEmpty()
  user!: User;

  @IsOptional()
  purchases!: Purchase[];
}
