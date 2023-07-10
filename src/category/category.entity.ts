import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { BaseEntity } from "../config/base.entity";
import { Product } from "../product/product.entity";

@Entity()
export class Category extends BaseEntity {
  @Column()
  name!: string;

  @Column()
  img!: string;

  @OneToMany(() => Product, (product) => product.category)
  products!: Product[];
}
