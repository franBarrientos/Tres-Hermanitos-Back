import { Router } from "express";

export class BaseRouter<T, U> {
  public router: Router;
  public controller: T;
  public middleware: U;
  constructor(TController: { new (): T }, UMiddlware: { new (): U }) {
    this.router = Router();
    this.controller = new TController();
    this.middleware = new UMiddlware();
    this.routes();
  }

  routes() {}
}
