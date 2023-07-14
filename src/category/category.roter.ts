import { BaseRouter } from "../router/router";
import { CategoryController } from "./category.controller";
import { CategoryMiddlware } from "./category.middleware";

export class CategoryRouter extends BaseRouter<
  CategoryController,
  CategoryMiddlware
> {
  constructor() {
    super(CategoryController, CategoryMiddlware);
  }
  routes(): void {
    this.router
      .get("/category", (req, res) => this.controller.getAll(req, res))
      .get("/category/:id", (req, res) => this.controller.get(req, res))
      .post(
        "/category",
        (req, res, next) => this.middleware.checkAdminRole(req, res, next),
        (req, res, next) => this.middleware.validatecategory(req, res, next),
        (req, res) => this.controller.create(req, res)
      )
      .put("/category/:id",
      (req, res, next) => this.middleware.checkAdminRole(req, res, next),
      (req, res) => this.controller.update(req, res))
      .delete("/category/:id",
      (req, res, next) => this.middleware.checkAdminRole(req, res, next),
      (req, res) => this.controller.delete(req, res));
  }
}
