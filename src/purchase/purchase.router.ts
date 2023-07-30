import { BaseRouter } from "../router/router";
import { MercadoPagoController } from "./mercadoPago/mercadoPago.controller";
import { PurchaseController } from "./purchase.controller";
import { PurchaseMiddlware } from "./purchase.middleware";

export class PurchaseRouter extends BaseRouter<
  PurchaseController,
  PurchaseMiddlware
> {
  constructor(
    private mercadoPagoController: MercadoPagoController = new MercadoPagoController()
  ) {
    super(PurchaseController, PurchaseMiddlware);
  }
  routes(): void {
    this.router
      .get("/purchase", (req, res) => this.controller.getAll(req, res))
      .get("/purchase/stadistics", (req, res) =>
        this.controller.getStadistics(req, res)
      )
      .get("/purchase/:id", (req, res) => this.controller.get(req, res))
      .get("/purchase/byName/name", (req, res) => this.controller.getByName(req, res))
      .get("/purchase/customer/:id", (req, res) => this.controller.getByCustomer(req, res))
      .post(
        "/purchase",
        (req, res, next) => [this.middleware.checkUserRole(req, res, next)],
        (req, res, next) => [this.middleware.validatePurchase(req, res, next)],
        (req, res) => this.controller.create(req, res)
      )
      .post("/create-order-mp", (req, res) =>
        this.mercadoPagoController.createOrder(req, res)
      )
      .post("/webhook", (req, res) =>
        this.mercadoPagoController.recibeWebhook(req, res)
      )
      .put("/purchase/:id",
      (req, res, next) => [this.middleware.checkAdminRole(req, res, next)],
      (req, res) => this.controller.update(req, res))
      .delete("/purchase/:id",
      (req, res, next) => [this.middleware.checkAdminRole(req, res, next)],
      (req, res) => this.controller.delete(req, res));
  }
}
