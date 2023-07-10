import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { BaseEntity } from "../config/base.entity";
import { Customer } from "../customer/customer.entity";
import { PurchasesProducts } from "./purchases-products.entity";

@Entity()
export class Purchase extends BaseEntity{
 
    @Column()
    state!:string
    
    @Column()
    payment!:string
    
    @ManyToOne(()=>Customer, (customer)=>customer.purchases)
    @JoinColumn()
    customer!:Customer

    @OneToMany(()=>PurchasesProducts, (purchasesProducts)=>purchasesProducts.purchase)
    purchasesProducts!:PurchasesProducts[]
}