import { NextFunction, Request, Response } from "express";
import { ResponseHttp } from "../config/responses.http";
import { validate } from "class-validator";
import { ProductDto } from "./product.dto";
import { AuthMiddleware } from "../auth/auth.middleware";

export class ProductMiddlware extends AuthMiddleware{
  constructor(
    private readonly responseHttp: ResponseHttp = new ResponseHttp()
  ) {super()}
  validateProduct(req: Request, res: Response, next: NextFunction) {
    const { name, description, price, category } = req.body;
    const productValidated = new ProductDto();
    productValidated.name = name;
    productValidated.description = description;
    productValidated.price = price;
    productValidated.category = category;
    productValidated.img = "img";

    validate(productValidated).then((err) => {
      if (err.length > 0) {
        return this.responseHttp.error(res, err);
      } else {
        next();
      }
    });
  }
}
