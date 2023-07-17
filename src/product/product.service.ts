import { DeleteResult, UpdateResult } from "typeorm";
import { BaseService } from "../config/base.service";
import { Product } from "./product.entity";
import { ProductDto } from "./product.dto";

export class ProductService extends BaseService<Product> {

  constructor() {
    super(Product);
  }
  public async findAllProducts(
    skip: number,
    limit: number,
    category: number
  ): Promise<[Product[], number]> {
    return (await this.repository).findAndCount({
      where: {
        stock: true,
        category:{
          id:category
        }
      },
      relations: {
        category: true,
      },
      select: {
        category: {
          id: true,
          name: true,
        },
      },
      skip,
      take: limit,
    });
  }

  public async findProductById(id: number): Promise<Product | null> {
    return (await this.repository).findOne({
      where: { id },
      relations: {
        category: true,
      },
      select: {
        category: {
          id: true,
          name: true,
        },
      },
    });
  }

  public async createProduct(body: ProductDto): Promise<Product> {
    return (await this.repository).save(body);
  }

  public async deleteProduct(id: number): Promise<DeleteResult> {
    return (await this.repository).delete(id);
  }

  public async updateProduct(
    id: number,
    infoUpdate: ProductDto
  ): Promise<UpdateResult> {
    return (await this.repository).update(id, infoUpdate);
  }
}
