import { NextFunction, Request, Response } from "express";
import { ResponseHttp } from "../config/responses.http";
import { validate } from "class-validator";
import { PurchaseDto } from "./purchase.dto";
import { AuthMiddleware } from "../auth/auth.middleware";

export class PurchaseMiddlware extends AuthMiddleware{
  constructor(
    private readonly responseHttp: ResponseHttp = new ResponseHttp()
  ) {super()}
  validatePurchase(req: Request, res: Response, next: NextFunction) {
    const { state, payment, customer, purchasesProducts } = req.body;
    const PurchaseValidated = new PurchaseDto();
    PurchaseValidated.state = state;
    PurchaseValidated.payment = payment;
    PurchaseValidated.customer = customer;

    validate(PurchaseValidated).then((err) => {
      if (err.length > 0) {
        return this.responseHttp.error(res, err);
      } else {
        next();
      }
    });
  }
}
