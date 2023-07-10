import { EntityTarget, ObjectLiteral, Repository } from "typeorm";
import { ServerConfig } from "./config";
import { BaseEntity } from "./base.entity";
import { AppDataSource } from "./data.source";

export class BaseService<T extends BaseEntity> extends ServerConfig {
  public repository: Promise<Repository<T>>;

  constructor(private getEntity: EntityTarget<T>) {
    super()
    this.repository = this.initRepository(getEntity);
  }

  async initRepository<T extends ObjectLiteral> (entity: EntityTarget<T>): Promise<Repository<T>> {
    const getConn = await this.initConnect;
    return getConn.getRepository(entity)
  }
}
