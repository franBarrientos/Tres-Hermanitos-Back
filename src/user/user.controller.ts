import { Request, Response } from "express";
import { UserService } from "./user.service";
import { ResponseHttp } from "../config/responses.http";
import { AuthService } from "../auth/auth.service";

export class UserController {
  constructor(
    private readonly userService: UserService = new UserService(),
    private readonly responseHttp: ResponseHttp = new ResponseHttp(),
    private readonly authService: AuthService = new AuthService()
  ) {}

  async getAll(req: Request, res: Response) {
    try {
      const skip = req.query.skip ? Number(req.query.skip) : 0;
      const limit = req.query.limit ? Number(req.query.limit) : 15;
      const users = await this.userService.findAllUser(skip, limit);
      if (users.length < 1)
        return this.responseHttp.notFound(res, "Not Found", " Not Found");
      this.responseHttp.oK(res, users);
    } catch (error) {
      this.responseHttp.error(res, error, error);
    }
  }

  async get(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const user = await this.userService.findUserById(id);
      if (!user)
        return this.responseHttp.notFound(res, "Not Found", id + " Not Found");
      this.responseHttp.oK(res, user);
    } catch (error) {
      this.responseHttp.error(res, error, error);
    }
  }
  async create(req: Request, res: Response) {
    try {
      const newUser = await this.userService.createUser(req.body);
      const userWithToken = this.authService.generateToken(newUser);
      this.responseHttp.created(res, userWithToken);
    } catch (error) {
      this.responseHttp.error(res, error, error);
    }
  }
  async update(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const responseUpdate = await this.userService.updateUser(id, req.body);
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
      const responseDelete = await this.userService.deleteUser(id);
      if (responseDelete.affected == 0)
        return this.responseHttp.notFound(res, "Not Found", id + " Not Found");
      this.responseHttp.oK(res, responseDelete);
    } catch (error) {
      this.responseHttp.error(res, error, error);
    }
  }
}
