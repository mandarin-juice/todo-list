import "reflect-metadata";
import { DataSource } from "typeorm";
import { Todo } from "./entities/Todo";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3307,
  username: "root",
  password: "root",
  database: "todos",
  entities: [Todo],
  synchronize: true,
  logging: false,
});

AppDataSource.initialize()
  .then(() => {
    console.log("Success to database initialize");
  })
  .catch((error) => console.log(error));
