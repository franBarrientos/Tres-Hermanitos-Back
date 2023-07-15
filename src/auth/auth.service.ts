import { ServerConfig } from "../config/config";
import User from "../user/user.entity";
import { UserService } from "../user/user.service";
import jwt, { JwtPayload } from "jsonwebtoken";
import bcrypt from "bcrypt";
import { RoleType } from "../user/user.dto";

export interface PayloadInterface {
  id: number;
  email: string;
  role: RoleType;
  exp?: any;
}

export class AuthService extends ServerConfig {
  JWTSecret: string;
  constructor(
    public readonly userService: UserService = new UserService(),
    private readonly jwtInstance = jwt
  ) {
    super();
    this.JWTSecret = this.getEnvironmet("JWT_SECRET") as string;
  }

  public async validatePasswordAndEmailUser(
    email: string,
    passwordPlane: string
  ): Promise<User | null> {
    const user = await this.userService.findUserByEmail(email);
    if (!user) {
      return null;
    }
    const match = await bcrypt.compare(passwordPlane, user.password);

    if (match) {
      return user;
    }
    return null;
  }

  public generateToken(
    user: User,
    refresh: boolean = false
  ): { token: string; user?: User } {
    const payload: PayloadInterface = {
      email: user.email,
      id: user.id,
      role: user.role,
    };
    if (refresh) {
      return {
        token: this.jwtInstance.sign(payload, this.JWTSecret, {
          expiresIn: 86400,
        }),
      };
    }
    user.password = "NOT PERMISISON";
    return {
      token: this.jwtInstance.sign(payload, this.JWTSecret, {
        expiresIn: 86400,
      }),
      user,
    };
  }

  public checkTokenExpiration(token: string): boolean | { token: string } {
    try {
      const decoded = this.verifyToken(token);
      if (!decoded) throw new Error("Expired or not exist"); // El token aún es válido
      return this.generateToken(decoded as User, true);
    } catch (error) {
      console.log("NO es Valido ");
      // Error al verificar el token (por ejemplo, firma inválida o token malformado)
      return false;
    }
  }

  public verifyToken(token: string): PayloadInterface | null {
    try {
      return jwt.verify(token, this.JWTSecret) as PayloadInterface;
    } catch (error) {
      return null;
    }
  }
}
