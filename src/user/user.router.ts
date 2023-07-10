import { UserController } from "./user.controller";
import { BaseRouter } from "../router/router";
import { UserMiddlware } from "./user.middleware";


export class UserRouter extends BaseRouter<UserController, UserMiddlware> {
  constructor() {
    super(UserController, UserMiddlware);
  }

  routes(): void {
    this.router
      .get("/users", (req, res) => this.controller.getAll(req, res))
      .get("/users/:id", (req, res) => this.controller.get(req, res))
      .post(
        "/users",
        (req, res, next) => [this.middleware.validateUser(req, res, next)],
        (req, res) => this.controller.create(req, res)
      )
      .put(
        "/users/:id",
        (req, res, next) => [this.middleware.checkUserRole(req, res, next)],
        (req, res) => this.controller.update(req, res)
      )
      .delete(
        "/users/:id",
        (req, res, next) => [this.middleware.checkAdminRole(req, res, next)],
        (req, res) => this.controller.delete(req, res)
      );
  }
}
