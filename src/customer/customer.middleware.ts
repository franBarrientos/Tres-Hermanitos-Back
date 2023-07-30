import { NextFunction, Request, Response } from "express";
import { ResponseHttp } from "../config/responses.http";
import { validate } from "class-validator";
import { CustomerDto } from "./customer.dto";
import { AuthMiddleware } from "../auth/auth.middleware";

export class CustomerMiddlware extends AuthMiddleware{
  constructor(
    private readonly responseHttp: ResponseHttp = new ResponseHttp()
  ) {super()}
  validateCustomer(req: Request, res: Response, next: NextFunction) {
    const { addres, dni, user, purchases } = req.body;
    const customerValidated = new CustomerDto();
    customerValidated.addres = addres;
    customerValidated.dni = dni;
    customerValidated.user = user;
    customerValidated.purchases = purchases;

    validate(customerValidated).then((err) => {
      if (err.length > 0) {
        return this.responseHttp.error(res, err);
      } else {
        next();
      }
    });
  }
}
