import { DeleteResult, Like, SelectQueryBuilder, UpdateResult } from "typeorm";
import { BaseService } from "../config/base.service";
import { PurchaseDto } from "./purchase.dto";
import { Purchase } from "./purchase.entity";

export class PurchaseService extends BaseService<Purchase> {
  constructor() {
    super(Purchase);
  }

  public async findAllPurchases(
    skip: number,
    limit: number
  ): Promise<[Purchase[], number]> {
    return (await this.repository).findAndCount({
      relations: [
        "customer",
        "customer.user",
        "purchasesProducts",
        "purchasesProducts.product",
      ],
      select: {
        customer: {
          id: true,
          dni: true,
          addres: true,
          user: {
            firstName: true,
            email: true,
          },
        },
        purchasesProducts: {
          id: true,
          product: {
            name: true,
          },
          quantity: true,
          totalPrice: true,
        },
      },
      skip,
      take: limit,
      order: {
        id: "DESC",
      },
    });
  }

  public async findPurchaseById(id: number): Promise<Purchase | null> {
    return (await this.repository).findOne({
      where: { id },
      relations: {
        customer: true,
        purchasesProducts: true,
      },
      select: {
        customer: {
          id: true,
          dni: true,
          addres: true,
        },
        purchasesProducts: {
          id: true,
          product: {
            id: true,
            name: true,
          },
          quantity: true,
          totalPrice: true,
        },
      },
    });
  }

  public async findPurchaseByCustomerId(
    id: number
  ): Promise<Purchase[] | null> {
    return (await this.repository).find({
      where: {
        customer: {
          id,
        },
      },
      relations: ["customer", "purchasesProducts", "purchasesProducts.product"],
      select: {
        customer: {
          id: true,
          dni: true,
          addres: true,
        },
        purchasesProducts: {
          id: true,
          product: {
            name: true,
          },
          quantity: true,
          totalPrice: true,
        },
      },
    });
  }
  public async findByName(
    skip: number,
    limit: number,
    name: string
  ): Promise<[Purchase[], number]> {
    return (await this.repository)
      .createQueryBuilder("purchase")
      .leftJoinAndSelect("purchase.customer", "customer")
      .leftJoinAndSelect("customer.user", "user")
      .leftJoinAndSelect("purchase.purchasesProducts", "purchasesProducts")
      .leftJoinAndSelect("purchasesProducts.product", "product")
      .where("user.firstName LIKE :name", { name: `%${name}%` })
      .orWhere("user.email LIKE :email", { email: `%${name}%` })
      .orWhere("customer.dni = :dni", { dni: Number(name) })
      .take(limit)
      .skip(skip)
      .getManyAndCount();
  }

  public async getProductsMostSales(): Promise<any[]> {
    return (await this.repository)
      .createQueryBuilder("purchase")
      .leftJoinAndSelect("purchase.purchasesProducts", "purchasesProducts")
      .leftJoinAndSelect("purchasesProducts.product", "product")
      .select("product.name", "productName")
      .addSelect("SUM(purchasesProducts.quantity)", "totalQuantity")
      .groupBy("product.name")
      .orderBy("totalQuantity", "DESC")
      .limit(5) // Limitar a los 5 productos más vendidos
      .getRawMany();
  }

  // Limitar a la categoría más vendida

  public async createPurchase(body: PurchaseDto): Promise<Purchase> {
    return (await this.repository).save(body);
  }

  public async deletePurchase(id: number): Promise<DeleteResult> {
    return (await this.repository).delete(id);
  }

  public async updatePurchase(
    id: number,
    infoUpdate: PurchaseDto
  ): Promise<UpdateResult> {
    return (await this.repository).update(id, infoUpdate);
  }
}
