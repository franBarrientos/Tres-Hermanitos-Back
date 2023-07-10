import { Request, Response } from "express";
import { AuthService } from "./auth.service";
import { ResponseHttp } from "../config/responses.http";
import { OAuth2Client } from "google-auth-library";
import { RoleType } from "../user/user.dto";

export class AuthController extends AuthService {
  private client: OAuth2Client;
  constructor(
    private readonly httpResponses: ResponseHttp = new ResponseHttp()
  ) {
    super();
    this.client = new OAuth2Client(this.getEnvironmet("GOOGLE_CLIENT_ID"));
  }

  async verifyGoogle(idToken: string) {
    const ticket = await this.client.verifyIdToken({
      audience: this.getEnvironmet("GOOGLE_CLIENT_ID"), // Specify the CLIENT_ID of the app that accesses the backend
      idToken,
    });
    const { name, email } = ticket.getPayload()!;
    return {
      name,
      email,
    };
  }

  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const user = await this.validatePasswordAndEmailUser(email, password);
      if (!user)
        return this.httpResponses.unauthorized(
          res,
          "Not Autorizate",
          "Not Autorizate :" + email
        );
      const userWithToken = this.generateToken(user);
      this.httpResponses.oK(res, userWithToken);
    } catch (error) {
      this.httpResponses.error(res, error);
    }
  }
  async google(req: Request, res: Response) {
    try {
      const { credential } = req.body;
      if (!credential) {
        return this.httpResponses.unauthorized(res, "Not Token", "Not Token :");
      }
      const { email, name } = await this.verifyGoogle(credential);
      let user = await this.userService.findUserByEmail(email!);
      if (!user) {
        const newUser = await this.userService.createUser({
          role: RoleType.USER,
          firstName: name!,
          email: email!,
          password: "123",
        });
        user = await this.userService.createUser(newUser);
      }

      const userWithToken = this.generateToken(user);

      this.httpResponses.oK(res, userWithToken);
    } catch (error) {
      this.httpResponses.error(res, error);
    }
  }
}
