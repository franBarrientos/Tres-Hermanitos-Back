import { NextFunction, Request, Response } from "express";
import { ResponseHttp } from "../config/responses.http";
import { AuthService } from "./auth.service";
import { RoleType } from "../user/user.dto";

export class AuthMiddleware {
  constructor(
    public readonly authService: AuthService = new AuthService(),
    private readonly httpResponses: ResponseHttp = new ResponseHttp()
  ) {}

  public checkAdminRole(req: Request, res: Response, next: NextFunction) {
    try {
      const token = req.headers.authorization?.split(" ").pop();
      if (!token) {
        return this.httpResponses.forbidden(res, "Not Token", "Not Token");
      }
      const payloadDecode = this.authService.verifyToken(token);
      if (!payloadDecode) {
        return this.httpResponses.forbidden(
          res,
          "Not Valid Token",
          "Not Valid Token"
        );
      }
      if (payloadDecode.role != RoleType.ADMIN) {
        return this.httpResponses.forbidden(
          res,
          "Not Permission",
          "Not Permission"
        );
      }
      next();
    } catch (error) {
      this.httpResponses.error(res, error);
    }
  }
  public checkUserRole(req: Request, res: Response, next: NextFunction) {
    try {
      const token = req.headers.authorization?.split(" ").pop();
      if (!token) {
        this.httpResponses.forbidden(res, "Not Token", "Not Token");
        return ;
      }
      const payloadDecode = this.authService.verifyToken(token);
      if (!payloadDecode) {
        return this.httpResponses.forbidden(
          res,
          "Not Valid Token",
          "Not Valid Token"
        );
      }
      if (payloadDecode.role != RoleType.USER) {
        return this.httpResponses.forbidden(
          res,
          "Not Permission",
          "Not Permission"
        );
      }
      next();
    } catch (error) {
      this.httpResponses.error(res, error);
    }
  }
  public checkCustomerRole(req: Request, res: Response, next: NextFunction) {
    try {
      const token = req.headers.authorization?.split(" ").pop();
      if (!token) {
        return this.httpResponses.forbidden(res, "Not Token", "Not Token");
      }
      const payloadDecode = this.authService.verifyToken(token);
      if (!payloadDecode) {
        return this.httpResponses.forbidden(
          res,
          "Not Valid Token",
          "Not Valid Token"
        );
      }
      if (payloadDecode.role != RoleType.CUSTOMER) {
        return this.httpResponses.forbidden(
          res,
          "Not Permission",
          "Not Permission"
        );
      }
      next();
    } catch (error) {
      this.httpResponses.error(res, error);
    }
  }
}
