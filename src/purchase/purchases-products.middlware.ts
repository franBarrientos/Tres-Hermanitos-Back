import { NextFunction, Request, Response } from "express";
import { ResponseHttp } from "../config/responses.http";
import { validate } from "class-validator";
import { PurchasesProductsDto } from "./purchases-products.dto";
import { AuthMiddleware } from "../auth/auth.middleware";

export class PurchasesProductsMiddlware extends AuthMiddleware{
  constructor(
    private readonly responseHttp: ResponseHttp = new ResponseHttp()
  ) {super()}
  validatePurchasesProducts(req: Request, res: Response, next: NextFunction) {
    const { quantity, totalPrice, purchase, product } = req.body;
    const PurchasesProductsValidated = new PurchasesProductsDto();
    PurchasesProductsValidated.quantity = quantity;
    PurchasesProductsValidated.totalPrice = totalPrice;
    PurchasesProductsValidated.purchase = purchase;
    PurchasesProductsValidated.product = product;

    validate(PurchasesProductsValidated).then((err) => {
      if (err.length > 0) {
        return this.responseHttp.error(res, err);
      } else {
        next();
      }
    });
  }
}
