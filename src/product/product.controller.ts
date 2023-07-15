import { ResponseHttp } from "../config/responses.http";
import { ProductDto } from "./product.dto";
import { ProductService } from "./product.service";
import { Request, Response } from "express";

export class ProductController {
  constructor(
    private readonly productService: ProductService = new ProductService(),
    private readonly responseHttp: ResponseHttp = new ResponseHttp()
  ) {}

  async getAll(req: Request, res: Response) {
    try {
      const skip = req.query.skip ? Number(req.query.skip) : 0;
      const limit = req.query.limit ? Number(req.query.limit) : 20;
      const products = await this.productService.findAllProducts(skip, limit);
      if (products.length < 1)
        return this.responseHttp.notFound(res, "Not Found", " Not Found");
      this.responseHttp.oK(res, products);
    } catch (error) {
      this.responseHttp.error(res, error, error);
    }
  }

  async get(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const product = await this.productService.findProductById(id);
      if (!product)
        return this.responseHttp.notFound(res, "Not Found", id + " Not Found");
      this.responseHttp.oK(res, product);
    } catch (error) {
      this.responseHttp.error(res, error, error);
    }
  }
  async create(req: Request, res: Response) {
    try {
      let product = req.body as ProductDto;
      if (!req.files?.img) throw new Error("no img");
      const urlImg = await this.productService.saveImgCloudinary(req.files.img);
      product.img = urlImg;
      const newProduct = await this.productService.createProduct(product);
      this.responseHttp.created(res, newProduct);
    } catch (error) {
      this.responseHttp.error(res, error, error);
    }
  }
  async update(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const product = req.body as ProductDto;
      if (req.files?.img) {
        product.img = "...";
        const thereImg = (await this.productService.findProductById(id))?.img;
        if (thereImg) {
          const urlSplited = thereImg.split("/");
          const name = urlSplited.pop();
          const cloudinaryId = name?.split(".").shift();
          await this.productService.deleteImgCloudinary(cloudinaryId);
        }
        const urlImg = await this.productService.saveImgCloudinary(
          req.files.img
        );
        product.img = urlImg;
      }

      const responseUpdate = await this.productService.updateProduct(
        id,
        product
      );
      if (responseUpdate.affected == 0)
        return this.responseHttp.notFound(res, "Not Found", id + " Not Found");
      this.responseHttp.oK(res, responseUpdate);
    } catch (error) {
      this.responseHttp.error(res, error, error);
    }
  }
  async delete(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const responseDelete = await this.productService.deleteProduct(id);
      if (responseDelete.affected == 0)
        return this.responseHttp.notFound(res, "Not Found", id + " Not Found");
      this.responseHttp.oK(res, responseDelete);
    } catch (error) {
      this.responseHttp.error(res, error, error);
    }
  }
}
