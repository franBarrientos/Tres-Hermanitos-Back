import { DeleteResult, UpdateResult } from "typeorm";
import { BaseService } from "../config/base.service";
import { Product } from "./product.entity";
import { ProductDto } from "./product.dto";
import cloudinary from "cloudinary";

export class ProductService extends BaseService<Product> {
  public cloudinary = cloudinary.v2.config({
    cloud_name: this.getEnvironmet("cloud_name"),
    api_key: this.getEnvironmet("api_key"),
    api_secret: this.getEnvironmet("api_secret"),
  });

  constructor() {
    super(Product);
  }

  public async saveImgCloudinary(file: any) {
    const pathFile = file.tempFilePath;
    const response = await cloudinary.v2.uploader.upload(pathFile);
    return response.secure_url;
  }

  public async findAllProducts(
    skip: number,
    limit: number
  ): Promise<Product[]> {
    return (await this.repository).find({
      where: {
        stock: true,
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
