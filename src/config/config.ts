import dotenv from "dotenv";
import { DataSource } from "typeorm";
import fs from "fs";
import { join } from "path";
import { AppDataSource } from "./data.source";
import cloudinary from "cloudinary";


export abstract class ServerConfig {
  
  constructor() {
    const pathEnvironmetVariables = this.createPath(this.getNodeEnv);
    dotenv.config({
      path: pathEnvironmetVariables,
    });
    cloudinary.v2.config({
      cloud_name: this.getEnvironmet("cloud_name"),
      api_key: this.getEnvironmet("api_key"),
      api_secret: this.getEnvironmet("api_secret"),
    });
     
  }

  public createPath(customEnv: string): string {
    let env = "env";
    if (customEnv.length > 0) env = customEnv + "." + env;
    return "." + env;
  }

  public getEnvironmet(v: string): string | undefined {
    return process.env[v];
  }
  public get getPort(): number {
    return Number(this.getEnvironmet("PORT"));
  }

  public get getNodeEnv(): string {
    return this.getEnvironmet("NODE_ENV")?.trim() || "";
  }

  public FilesOfPath(path: string, extensions: string[]): string[] {
    const files = fs.readdirSync(path);

    const matchingFiles = files.filter((file) => {
      return extensions.some((extension) => file.endsWith(extension));
    });

    return matchingFiles;
  }

  public getImports(files: string[], path: string): NodeRequire[] {
    return files.map((file) => require(join(path, file)).default);
  }

  get initConnect(): Promise<DataSource> {
    return AppDataSource.initialize();
  }

}
