import { Request, Response } from "express";
import { ResponseHttp } from "../config/responses.http";
import { PurchasesProductsService } from "./purchases-products.service";

export class PurchaseProductController {
  constructor(
    private readonly purchasesProductService: PurchasesProductsService = new PurchasesProductsService(),
    private readonly responseHttp: ResponseHttp = new ResponseHttp()
  ) {}

  async getAll(req: Request, res: Response) {
    try {
      const skip = req.query.skip ? Number(req.query.skip) : 0;
      const limit = req.query.limit ? Number(req.query.limit) : 15;
      const purchaseProducts =
        await this.purchasesProductService.findAllPurchasesProductss(
          skip,
          limit
        );
      if (purchaseProducts.length < 1)
        return this.responseHttp.notFound(res, "Not Found", " Not Found");
      this.responseHttp.oK(res, purchaseProducts);
    } catch (error) {
      this.responseHttp.error(res, error, error);
    }
  }

  async get(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const purchaseProduct =
        await this.purchasesProductService.findPurchasesProductsById(id);
      if (!purchaseProduct)
        return this.responseHttp.notFound(res, "Not Found", id + " Not Found");
      this.responseHttp.oK(res, purchaseProduct);
    } catch (error) {
      this.responseHttp.error(res, error, error);
    }
  }
  async create(req: Request, res: Response) {
    try {
      const newPurchaseProduct =
        await this.purchasesProductService.createPurchasesProducts(req.body);
      this.responseHttp.created(res, newPurchaseProduct);
    } catch (error) {
      this.responseHttp.error(res, error, error);
    }
  }
  async update(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const responseUpdate =
        await this.purchasesProductService.updatePurchasesProducts(
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
      const responseDelete =
        await this.purchasesProductService.deletePurchasesProducts(id);
      if (responseDelete.affected == 0)
        return this.responseHttp.notFound(res, "Not Found", id + " Not Found");
      this.responseHttp.oK(res, responseDelete);
    } catch (error) {
      this.responseHttp.error(res, error, error);
    }
  }
}
