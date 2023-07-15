import { ResponseHttp } from "../../config/responses.http";
import { Request, Response } from "express";
import mercadopago, { payment } from "mercadopago";
import { ServerConfig } from "../../config/config";
import { PurchaseService } from "../purchase.service";

export class MercadoPagoController extends ServerConfig {
  constructor(
    private readonly responseHttp: ResponseHttp = new ResponseHttp(),
    private readonly purchaseServide: PurchaseService = new PurchaseService()
  ) {
    super();
  }

  public async createOrder(req: Request, res: Response) {
    try {
      mercadopago.configure({
        access_token: this.getEnvironmet("MERCADO_PAGO_TOKEN")!,
      });
      const { carrito, idPurchase } = req.body;
      console.log(idPurchase);
      console.log(carrito);
      const carritoMp = carrito.map((item: any) => {
        return {
          title: item.name,
          quantity: item.quantity,
          unit_price: item.price,
          currency_id: "ARS",
        };
      });
      const response = await mercadopago.preferences.create({
        items: carritoMp,
        external_reference: `${idPurchase}`,
        back_urls: {
          failure: "https://lyjjoyas.vercel.app/",
          success: "https://lyjjoyas.vercel.app/",
          pending: "https://lyjjoyas.vercel.app/",
        },
        notification_url:
          "https://ecommerce-backv3-production.up.railway.app/api/webhook",
      });

      this.responseHttp.oK(res, { urlMercadoPago: response.body.init_point });
    } catch (error) {
      this.responseHttp.error(res, error);
    }
  }

  public async recibeWebhook(req: Request, res: Response) {
    try {
      const query = req.query;
      console.log(query);
      console.log(query);
      console.log(query);
      console.log(query);

      if (query.type == "payment") {
        const data = await mercadopago.payment.findById(
          query["data.id"] as unknown as number
        );
        console.log("Data");
        console.log("Data");
        console.log(data);
        console.log(data);

        if (data.body.status == "approved") {
          const idPurchase = data.body.external_reference;
          await this.purchaseServide.updatePurchase(Number(idPurchase), {
            state: "paid",
          });
        }
      }
      this.responseHttp.oK(res, "Ok");
    } catch (error) {
      this.responseHttp.error(res, error);
    }
  }
}
