import { Column, Entity, JoinColumn, OneToMany, OneToOne } from "typeorm";
import { BaseEntity } from "../config/base.entity";
import User from "../user/user.entity";
import { Purchase } from "../purchase/purchase.entity";

@Entity()
export class Customer extends BaseEntity {
  @Column()
  addres!: string;

  @Column()
  dni!: number;

  @OneToOne(()=>User, (user)=>user.customer)
  @JoinColumn()
  user!:User

  @OneToMany(()=>Purchase, (purchase)=>purchase.customer)
  purchases!:Purchase[]
}
