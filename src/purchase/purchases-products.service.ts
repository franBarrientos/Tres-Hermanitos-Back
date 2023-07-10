import { DeleteResult, UpdateResult } from "typeorm";
import { BaseService } from "../config/base.service";
import { PurchasesProducts } from "./purchases-products.entity";
import { PurchasesProductsDto } from "./purchases-products.dto";
import { ProductService } from "../product/product.service";

export class PurchasesProductsService extends BaseService<PurchasesProducts> {
  constructor(
    private readonly productService: ProductService = new ProductService()
  ) {
    super(PurchasesProducts);
  }

  public async findAllPurchasesProductss(
    skip: number,
    limit: number
  ): Promise<PurchasesProducts[]> {
    return (await this.repository).find({
      relations: {
        purchase: true,
        product: true,
      },
      select: {
        purchase: {
          id: true,
          customer: {
            id: true,
            dni: true,
          },
        },
        product: {
          id: true,
          name: true,
          price: true,
        },
      },
      skip,
      take: limit,
    });
  }

  public async findPurchasesProductsById(
    id: number
  ): Promise<PurchasesProducts | null> {
    return (await this.repository).findOne({
      where: { id },
      relations: {
        purchase: true,
        product: true,
      },
      select: {
        purchase: {
          id: true,
          customer: {
            id: true,
            dni: true,
          },
        },
        product: {
          id: true,
          name: true,
          price: true,
        },
      },
    });
  }

  public async createPurchasesProducts(
    body: PurchasesProductsDto
  ): Promise<PurchasesProducts> {
    const newPurchasesProduct = (await this.repository).create(body);
    const product = await this.productService.findProductById(
      Number(newPurchasesProduct.product)
    );
    newPurchasesProduct.totalPrice =
      product!.price * newPurchasesProduct.quantity;
    return (await this.repository).save(newPurchasesProduct);
  }

  public async getCategorysMostSales(): Promise<any[]> {
    return (await this.repository)
    .createQueryBuilder("purchaseProduct")
      .leftJoinAndSelect("purchaseProduct.product", "product")
      .leftJoinAndSelect("product.category", "category")
      .select("category.name", "categoryName")
      .addSelect("SUM(purchaseProduct.quantity)", "totalQuantity")
      .groupBy("category.name")
      .orderBy("totalQuantity", "DESC")
      .limit(5)
      .getRawMany();
  }

  public async deletePurchasesProducts(id: number): Promise<DeleteResult> {
    return (await this.repository).delete(id);
  }

  public async updatePurchasesProducts(
    id: number,
    infoUpdate: PurchasesProductsDto
  ): Promise<UpdateResult> {
    return (await this.repository).update(id, infoUpdate);
  }
}
