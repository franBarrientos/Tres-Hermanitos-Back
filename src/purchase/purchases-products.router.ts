import { BaseRouter } from "../router/router";
import { PurchaseProductController } from "./purchases-products.controller";
import { PurchasesProductsMiddlware } from "./purchases-products.middlware";

export class PurchasesProductRouter extends BaseRouter<
  PurchaseProductController,
  PurchasesProductsMiddlware
> {
  constructor() {
    super(PurchaseProductController, PurchasesProductsMiddlware);
  }
  routes(): void {
    this.router
      .get("/purchasesProducts", (req, res) => this.controller.getAll(req, res))
      .get("/purchasesProducts/:id", (req, res) =>
        this.controller.get(req, res)
      )
      .post(
        "/purchasesProducts",
        (req, res, next) => [
          this.middleware.validatePurchasesProducts(req, res, next),
        ],
        (req, res) => this.controller.create(req, res)
      )
      .put("/purchasesProducts/:id", (req, res) =>
        this.controller.update(req, res)
      )
      .delete("/purchasesProducts/:id", (req, res) =>
        this.controller.delete(req, res)
      );
  }
}
