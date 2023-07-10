import { IsOptional, IsString, Length } from "class-validator";
import { BaseDto } from "../config/base.dto";
import { Product } from "../product/product.entity";


export class CategoryDto extends BaseDto {
    
    @IsString()
    @Length(1,50)
    name!:string

    @IsString()
    @Length(1,200)
    img!:string

    @IsOptional()
    products!:Product[]
}