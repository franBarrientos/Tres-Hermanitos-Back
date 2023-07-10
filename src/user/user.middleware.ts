import { NextFunction, Request, Response } from "express";
import { RoleType, UserDto } from "./user.dto";
import { ResponseHttp } from "../config/responses.http";
import { validate } from "class-validator";
import { AuthMiddleware } from "../auth/auth.middleware";

export class UserMiddlware extends AuthMiddleware {
  constructor(
    private readonly responseHttp: ResponseHttp = new ResponseHttp()
  ) {
    super();
  }
  validateUser(req: Request, res: Response, next: NextFunction) {
    const { age, city, email, firstName, lastName, password, province, role } =
      req.body;
    const userValidated = new UserDto();
    userValidated.age = age || null;
    userValidated.city = city || null;
    userValidated.email = email;
    userValidated.firstName = firstName;
    userValidated.lastName = lastName || null;
    userValidated.password = password;
    userValidated.province = province || null;
    userValidated.role = role;

    validate(userValidated).then((err) => {
      if (err.length > 0) {
        console.log(err);
        console.log("dadasdasd");
        return this.responseHttp.error(res, err);
      } else {
        next();
      }
    });
  }
}
