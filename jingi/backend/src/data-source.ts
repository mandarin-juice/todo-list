import "reflect-metadata";
import { DataSource } from "typeorm";
import { Todo } from "./entity/Todo";

const AppDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 23306,
  username: "root",
  password: "1234",
  database: "todo-list",
  entities: [Todo],
  synchronize: true,
  logging: false,
});

try {
  AppDataSource.initialize();
} catch (err) {
  console.error(err);
}

export const todoRepository = AppDataSource.getRepository(Todo);
