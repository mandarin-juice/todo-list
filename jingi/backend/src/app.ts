import Fastify from "fastify";
import cors from "@fastify/cors";

import { todoRepository } from "./data-source";
import { Todo } from "./entity/Todo";

const fastify = Fastify({
  logger: true,
});

fastify.register(cors, {});

fastify.get("/ping", async (request, reply) => "pong");
fastify.get("/todos", async (request, reply) => {
  const allTodos = await todoRepository.find();
  console.log(allTodos);
  return allTodos;
});

fastify.post<{
  Body: { text: string; isDone: boolean };
}>("/todos", async (request, reply) => {
  const { text, isDone } = request.body;
  console.log(request.body, text, isDone);
  const todo = new Todo();
  todo.text = text;
  todo.isDone = isDone;
  await todoRepository.save(todo);

  reply.send({ id: todo.id });
});

fastify.put<{
  Params: { id: number };
  Body: { text: string; isDone: boolean };
}>("/todos/:id", async (request, reply) => {
  const { id } = request.params;
  const { text, isDone } = request.body;
  const todo = await todoRepository.findOneBy({ id });

  if (todo) {
    todo.text = text;
    todo.isDone = isDone;
    await todoRepository.save(todo);
  } else {
    reply.code(404);
  }
});

fastify.delete<{
  Params: { id: number };
}>("/todos/:id", async (request, reply) => {
  const { id } = request.params;
  const todo = await todoRepository.findOneBy({ id });

  if (todo) {
    await todoRepository.remove(todo);
  } else {
    reply.code(404);
  }
});

(async () => {
  try {
    const address = await fastify.listen({ port: 3000 });
    fastify.log.info(`Server listening on ${address}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
})();
