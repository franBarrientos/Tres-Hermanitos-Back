import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from "typeorm";
import { BaseEntity } from "../config/base.entity";
import { Customer } from "../customer/customer.entity";
import { RoleType } from "./user.dto";

@Entity()
class User extends BaseEntity {
  @Column()
  firstName!: string;

  @Column({nullable:true})
  lastName?: string;

  @Column({unique:true})
  email!: string;

  @Column({select:false})
  password!: string;
  
  @Column({nullable:true})
  city?: string;

  @Column({nullable:true})
  age?: number;

  @Column({type:"enum", enum:RoleType, nullable:false, default:RoleType.USER})
  role!: RoleType;

  @Column({nullable:true})
  province?: string;

  @OneToOne(()=>Customer, (customer)=>customer.user)
  customer!:Customer
}

export default User;
