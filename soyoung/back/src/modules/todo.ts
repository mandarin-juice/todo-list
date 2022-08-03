import { FastifyInstance } from "fastify";
import { Todo } from "../entities/Todo";

async function routes(fastify: FastifyInstance, options: Object) {
  fastify.get("/", async (request, reply) => {
    const todos = await Todo.find();
    return todos;
  });

  fastify.post("/", async (request, reply) => {
    // Todo
  });

  fastify.patch("/:id", async (request, reply) => {
    // Todo
  });

  fastify.delete("/:id", async (request, reply) => {
    // Todo
  });
}

export default routes;
