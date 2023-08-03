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
      const skip = req.query.skip ? Number(req.query.skip) : 1;
      const limit = req.query.limit ? Number(req.query.limit) : 9;
      const category = req.query.category ? Number(req.query.category) : 1;
      const ITEMS_PER_PAGE = (skip - 1) * 9;
      const [products, total] = await this.productService.findAllProducts(
        ITEMS_PER_PAGE,
        limit,
        category
      );
      if (products.length < 1)
        return this.responseHttp.notFound(res, "Not Found", " Not Found");
      this.responseHttp.oK(res, {
        products,
        total,
        totalPages: Math.ceil(total / limit),
      });
    } catch (error) {
      this.responseHttp.error(res, error, error);
    }
  }
  async getByName(req: Request, res: Response) {
    try {
      const skip = req.query.skip ? Number(req.query.skip) : 1;
      const limit = req.query.limit ? Number(req.query.limit) : 9;
      const name = req.query.name ? (req.query.name as string) : "";
      const ITEMS_PER_PAGE = (skip - 1) * 9;
      console.log(name);
      const [products, total] = await this.productService.findByName(
        ITEMS_PER_PAGE,
        limit,
        name
      );
      if (products.length < 1)
        return this.responseHttp.notFound(res, "Not Found", " Not Found");
      this.responseHttp.oK(res, {
        products,
        total,
        totalPages: Math.ceil(total / limit),
      });
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
  async getFavs(req: Request, res: Response) {
    try {
      const product = await this.productService.getFavs();
      if (!product || product?.length < 1)
        return this.responseHttp.notFound(res, "Not Found", " Not Found");
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
