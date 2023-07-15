import { BaseRouter } from "../router/router";
import { AuthController } from "./auth.controller";
import { AuthMiddleware } from "./auth.middleware";

export class AuthRouter extends BaseRouter<AuthController, AuthMiddleware> {
  constructor() {
    super(AuthController, AuthMiddleware);
  }

  routes(): void {
    this.router.post("/login", (req, res) => this.controller.login(req, res));
    this.router.post("/refreshToken", (req, res) => this.controller.refreshToken(req, res));
    this.router.post("/google", (req, res) => this.controller.google(req, res));
  }
}
