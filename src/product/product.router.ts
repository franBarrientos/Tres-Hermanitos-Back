import { BaseRouter } from "../router/router";
import { ProductController } from "./product.controller";
import { ProductMiddlware } from "./product.middleware";

export class ProductRouter extends BaseRouter<
  ProductController,
  ProductMiddlware
> {
  constructor() {
    super(ProductController, ProductMiddlware);
  }

  routes(): void {
    this.router
      .get("/product", (req, res) => this.controller.getAll(req, res))
      .get("/product/:id", (req, res) => this.controller.get(req, res))
      .post(
        "/product",
        (req, res, next) => this.middleware.checkAdminRole(req, res, next),
        (req, res, next) => this.middleware.validateProduct(req, res, next),
        (req, res) => this.controller.create(req, res)
      )
      .put(
        "/product/:id",
        (req, res, next) => this.middleware.checkAdminRole(req, res, next),
        (req, res) => this.controller.update(req, res)
      )
      .delete("/product/:id",
      (req, res, next) => this.middleware.checkAdminRole(req, res, next),
      (req, res) => this.controller.delete(req, res));
  }
}
