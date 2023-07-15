import { EntityTarget, ObjectLiteral, Repository } from "typeorm";
import { ServerConfig } from "./config";
import { BaseEntity } from "./base.entity";
import { AppDataSource } from "./data.source";
import cloudinary from "cloudinary";

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

  public async saveImgCloudinary(file: any) {
    const pathFile = file.tempFilePath;
    const response = await cloudinary.v2.uploader.upload(pathFile);
    return response.secure_url;
  }
  public async deleteImgCloudinary(id: any) {
     cloudinary.v2.uploader.destroy(id);
  }
}
