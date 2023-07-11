import { Request, Response } from "express";
import { ResponseHttp } from "../config/responses.http";
import { PurchaseService } from "./purchase.service";
import { PurchasesProductsService } from "./purchases-products.service";

export class PurchaseController {
  constructor(
    private readonly purchaseService: PurchaseService = new PurchaseService(),
    private readonly responseHttp: ResponseHttp = new ResponseHttp(),
    private readonly purchaseProductsService: PurchasesProductsService = new PurchasesProductsService()
  ) {}

  async getAll(req: Request, res: Response) {
    try {
      const skip = req.query.skip ? Number(req.query.skip) : 0;
      const limit = req.query.limit ? Number(req.query.limit) : 15;
      const purchases = await this.purchaseService.findAllPurchases(
        skip,
        limit
      );
      if (purchases.length < 1)
        return this.responseHttp.notFound(res, "Not Found", " Not Found");
      const responseWithTotal = purchases.map((purchas) => {
        return {
          ...purchas,
          totalPurchase: purchas.purchasesProducts.reduce((acc, product) => {
            return product.totalPrice + acc;
          }, 0),
        };
      });
      this.responseHttp.oK(res, responseWithTotal);
    } catch (error) {
      this.responseHttp.error(res, error, error);
    }
  }

  async get(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const purchase = await this.purchaseService.findPurchaseById(id);
      if (!purchase)
        return this.responseHttp.notFound(res, "Not Found", id + " Not Found");
      this.responseHttp.oK(res, purchase);
    } catch (error) {
      this.responseHttp.error(res, error, error);
    }
  }
  async getByCustomer(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const purchase = await this.purchaseService.findPurchaseByCustomerId(id);
      if (!purchase || purchase.length < 1)
        return this.responseHttp.notFound(res, "Not Found", id + " Not Found");
      this.responseHttp.oK(res, purchase);
    } catch (error) {
      this.responseHttp.error(res, error, error);
    }
  }
  async getStadistics(req: Request, res: Response) {
    try {
      const stadisticsProducts = await this.purchaseService.getProductsMostSales();
      const stadisticsCategory = await this.purchaseProductsService.getCategorysMostSales();

      if (!stadisticsProducts){
        return this.responseHttp.notFound(res, "Not Found", " Not Found");
        console.log(stadisticsProducts);
      }
      if(!stadisticsCategory){
        return this.responseHttp.notFound(res, "Not Found", " Not Found");
        console.log(stadisticsProducts);
      }
    this.responseHttp.oK(res, {stadisticsProducts, stadisticsCategory});
    } catch (error) {
      this.responseHttp.error(res, error, error);
    }
  }
  async create(req: Request, res: Response) {
    try {
      const newPurchase = await this.purchaseService.createPurchase(req.body);
      this.responseHttp.created(res, newPurchase);
    } catch (error) {
      this.responseHttp.error(res, error, error);
    }
  }
  async update(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const responseUpdate = await this.purchaseService.updatePurchase(
        id,
        req.body
      );
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
      const responseDelete = await this.purchaseService.deletePurchase(id);
      if (responseDelete.affected == 0)
        return this.responseHttp.notFound(res, "Not Found", id + " Not Found");
      this.responseHttp.oK(res, responseDelete);
    } catch (error) {
      this.responseHttp.error(res, error, error);
    }
  }
}
