import { ResponseHttp } from "../../config/responses.http";
import { Request, Response } from "express";
import mercadopago from "mercadopago";
import { ServerConfig } from "../../config/config";

export class MercadoPagoController extends ServerConfig {
  constructor(
    private readonly responseHttp: ResponseHttp = new ResponseHttp()
  ) {
    super();
  }

  public async createOrder(req: Request, res: Response) {
    try {
      mercadopago.configure({
        access_token: this.getEnvironmet("MERCADO_PAGO_TOKEN")!,
      });
      const { carrito } = req.body;
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
        back_urls:{
            failure:"http://localhost:5173",
            success:"http://localhost:5173",
            pending:"http://localhost:5173",
        }
      });

      this.responseHttp.oK(res, { urlMercadoPago: response.body.init_point });
    } catch (error) {
      this.responseHttp.error(res, error);
    }
  }
}
