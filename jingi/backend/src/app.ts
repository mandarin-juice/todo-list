import Fastify from "fastify";
import { todoRepository } from "./data-source";
import { Todo } from "./entity/Todo";

const fastify = Fastify({
  logger: true,
});

fastify.get("/ping", async (request, reply) => "pong");
fastify.get("/todos", async (request, reply) => {
  const allTodos = await todoRepository.find();
  return allTodos;
});

fastify.post<{
  Body: { text: string; isDone: boolean };
}>("/todos", async (request, reply) => {
  const { text, isDone } = request.body;
  const todo = new Todo();
  todo.text = text;
  todo.isDone = isDone;
  todoRepository.save(todo);

  return { id: todo.id };
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
    todoRepository.save(todo);
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
    todoRepository.remove(todo);
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
