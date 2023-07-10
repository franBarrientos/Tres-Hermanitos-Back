import { BaseService } from "../config/base.service";
import User from "./user.entity";
import { UserDto } from "./user.dto";
import { DeleteResult, UpdateResult } from "typeorm";
import bcrypt from "bcrypt"

export class UserService extends BaseService<User> {
  constructor() {
    super(User);
  }

  public async findAllUser(skip: number, limit: number): Promise<User[]> {
    return (await this.repository).find({
      skip,
      take:limit
    });
  }

  public async findUserById(id: number): Promise<User | null> {
    return (await this.repository).findOne({ where: { id }, relations:{
      customer:true
    } });
  }

  public async findUserByEmail(email: string): Promise<User | null> {
    return (await this.repository).
    createQueryBuilder("user")
    .leftJoinAndSelect("user.customer","customer")
    .addSelect("user.password")
    .where({email})
    .getOne();
  }

  public async createUser(body: UserDto): Promise<User> {
    const newUser = (await this.repository).create(body);
    newUser.password = await bcrypt.hash(newUser.password, 10);
    return (await this.repository).save(newUser);
  }

  public async deleteUser(id: number): Promise<DeleteResult> {
    return (await this.repository).delete(id);
  }

  public async updateUser(
    id: number,
    infoUpdate: UserDto
  ): Promise<UpdateResult> {
    return (await this.repository).update(id, infoUpdate);
  }
}
