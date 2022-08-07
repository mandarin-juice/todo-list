import { FastifyInstance } from "fastify";
import { registerTodoHandler, getTodosHandler } from "./todo.controller";
import { createTodoSchema } from "./todo.schema";

async function todoRoutes(server: FastifyInstance) {
  server.post("/", { schema: { body: createTodoSchema } }, registerTodoHandler);

  server.get("/", getTodosHandler);
}

export default todoRoutes;
