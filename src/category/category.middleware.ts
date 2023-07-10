import { NextFunction, Request, Response } from "express";
import { ResponseHttp } from "../config/responses.http";
import { validate } from "class-validator";
import { CategoryDto } from "./category.dto";

export class CategoryMiddlware {
  constructor(
    private readonly responseHttp: ResponseHttp = new ResponseHttp()
  ) {}
  validatecategory(req: Request, res: Response, next: NextFunction) {
    const { name, img} = req.body;
    const categoryValidated = new CategoryDto();
    categoryValidated.name = name;
    categoryValidated.img = img;

    validate(categoryValidated).then((err) => {
      if (err.length > 0) {
        return this.responseHttp.error(res, err);
      } else {
        next();
      }
    });
  }
}
