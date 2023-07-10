import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from "typeorm";
import { BaseEntity } from "../config/base.entity";
import { Customer } from "../customer/customer.entity";

@Entity()
class UserTest extends BaseEntity {
  @Column()
  firstName!: string;

  @Column()
  lastName!: string;

  @Column()
  email!: string;

  @Column()
  password!: string;
  
  @Column()
  city!: string;

  @Column()
  province!: string;

  @OneToOne(()=>Customer, (customer)=>customer.user)
  customer!:Customer
}

export default UserTest;
