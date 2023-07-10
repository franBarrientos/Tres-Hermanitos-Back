import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { BaseEntity } from "../config/base.entity";
import { Category } from "../category/category.entity";
import { PurchasesProducts } from "../purchase/purchases-products.entity";

@Entity()
export class Product extends BaseEntity{
 
    @Column()
    name!:string
    
    @Column()
    description!:string
    
    @Column()
    img!:string
    
    @Column()
    price!:number
    
    @ManyToOne(()=>Category,
    (category=>category.products))
    @JoinColumn()
    category!:Category

    @OneToMany(()=>PurchasesProducts, (purchasesProducts)=>purchasesProducts.product)
    purchasesProducts!:PurchasesProducts[]
}