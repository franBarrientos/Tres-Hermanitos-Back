import * as dotenv from "dotenv";
import { DataSource, DataSourceOptions } from "typeorm";
dotenv.config({
  path:
    process.env.NODE_ENV !== undefined
      ? `.${process.env.NODE_ENV.trim()}.env`
      : ".env",
});

export const AppDataSource: DataSource = new DataSource({
  type: "mysql",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  entities: [__dirname + `/../**/*.entity{.ts,.js}`],
  migrations: [__dirname + "/../migrations/*{.ts,.js}"],
  // "make migration" : "npm run typeorm migration:generate",
  //  "run migration" : "npm run typeorm migration:run"
  synchronize: false,
});
