import express from "express";
import cors from "cors";
import "reflect-metadata";
import { ServerConfig } from "./config/config";
import { UserRouter } from "./user/user.router";
import { AppDataSource } from "./config/data.source";
import { CustomerRouter } from "./customer/customer.router";
import { ProductRouter } from "./product/product.router";
import { CategoryRouter } from "./category/category.roter";
import { PurchaseRouter } from "./purchase/purchase.router";
import { PurchasesProductRouter } from "./purchase/purchases-products.router";
import { AuthRouter } from "./auth/auth.router";

class ServerBoostrap extends ServerConfig {
  public app: express.Application = express();
  private port: number = this.getPort;

  constructor() {
    super();
    this.app.use(cors({origin:"*"}));
    this.app.use(express.json());
    this.app.use("/api", this.routes());
    this.connectDB();
    this.listen();
  }

  routes(): Array<express.Router> {
    return [
      new UserRouter().router,
      new CustomerRouter().router,
      new ProductRouter().router,
      new CategoryRouter().router,
      new PurchaseRouter().router,
      new PurchasesProductRouter().router,
      new AuthRouter().router,
    ];
  }

  async connectDB() {
    try {
      await this.initConnect;
      console.log("Connected to Db succesfully!!!!");
    } catch (error) {
      console.log("An error ocurred..");
      console.log(error);
    }
  }

  listen() {
    this.app.listen(this.port, () =>
      console.log(`Listening on port: ${this.port}`)
    );
  }
}

new ServerBoostrap();
