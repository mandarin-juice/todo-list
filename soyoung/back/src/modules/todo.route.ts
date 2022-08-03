import { FastifyInstance } from "fastify";
import { registerTodoHandler, getTodosHandler } from "./todo.controller";
import { schema } from "./todo.schema";

async function todoRoutes(server: FastifyInstance) {
  server.post("/", { schema }, registerTodoHandler);

  server.get("/", getTodosHandler);
}

export default todoRoutes;
