import { FastifyInstance } from "fastify";
import {
  registerTodoHandler,
  getTodosHandler,
  updateTodoHandler,
  deleteTodoHandler,
} from "./todo.controller";
import {
  createTodoSchema,
  updateTodoSchema,
  deleteTodoSchema,
} from "./todo.schema";

async function todoRoutes(server: FastifyInstance) {
  server.post("/", { schema: { body: createTodoSchema } }, registerTodoHandler);

  server.get("/", getTodosHandler);

  server.put("/", { schema: { body: updateTodoSchema } }, updateTodoHandler);

  server.delete(
    "/:id",
    { schema: { params: deleteTodoSchema } },
    deleteTodoHandler
  );
}

export default todoRoutes;
