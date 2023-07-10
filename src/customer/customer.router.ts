import { BaseRouter } from "../router/router";
import { CustomerController } from "./customer.controller";
import { CustomerMiddlware } from "./customer.middleware";

export class CustomerRouter extends BaseRouter<
  CustomerController,
  CustomerMiddlware
> {
  constructor() {
    super(CustomerController, CustomerMiddlware);
  }
  routes(): void {
    this.router
      .get("/customer", (req, res) => this.controller.getAll(req, res))
      .get("/customer/:id", (req, res) => this.controller.get(req, res))
      .post(
        "/customer",
        (req, res, next) => [this.middleware.validateCustomer(req, res, next)],
        (req, res) => this.controller.create(req, res)
      )
      .put("/customer/:id", (req, res) => this.controller.update(req, res))
      .delete("/customer/:id", (req, res) => this.controller.delete(req, res));
  }
}
