import { IsEmail, IsNotEmpty, IsOptional, Length } from "class-validator";
import { BaseDto } from "../config/base.dto";

export class UserDto extends BaseDto {
  @Length(3, 30)
  @IsNotEmpty()
  firstName!: string;

  @Length(3, 30)
  @IsOptional()
  lastName?: string;

  @IsEmail()
  @IsNotEmpty()
  email!: string;

  @Length(3, 20)
  @IsNotEmpty()
  password!: string;

  @IsOptional()
  age?: number;

  @IsNotEmpty()
  role!: RoleType;

  @Length(3, 30)
  @IsOptional()
  city?: string;

  @Length(3, 30)
  @IsOptional()
  province?: string;
}


export enum RoleType{
  USER = "USER",
  CUSTOMER = "CUSTOMER",
  ADMIN = "ADMIN"
}