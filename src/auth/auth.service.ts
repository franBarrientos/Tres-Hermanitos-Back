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

  public generateToken(user: User): { token: string; user: User } {
    const payload: PayloadInterface = {
      email: user.email,
      id: user.id,
      role: user.role,
    };
    user.password = "NOT PERMISISON";
    return {
      token: this.jwtInstance.sign(payload, this.JWTSecret, {
        expiresIn: "2hr",
      }),
      user,
    };
  }

  public verifyToken(token: string):PayloadInterface | null {
    try {
      return jwt.verify(token, this.JWTSecret) as PayloadInterface;
    } catch (error) {
      return null;
    }
  }
}
