import { NextFunction, Request, Response } from "express";
import { ResponseHttp } from "../config/responses.http";
import { validate } from "class-validator";
import { PurchasesProductsDto } from "./purchases-products.dto";

export class PurchasesProductsMiddlware {
  constructor(
    private readonly responseHttp: ResponseHttp = new ResponseHttp()
  ) {}
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
