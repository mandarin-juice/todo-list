import { FastifyReply, FastifyRequest } from "fastify";
import { createTodo, findTodos } from "./todo.service";

export async function registerTodoHandler(
  request: FastifyRequest<{
    Body: CreateTodoParams;
  }>,
  reply: FastifyReply
) {
  const body = request.body;

  try {
    const user = await createTodo(body);

    return reply.code(201).send(user);
  } catch (e) {
    console.log(e);
    return reply.code(500).send(e);
  }
}

export async function getTodosHandler() {
  const todos = await findTodos();

  return todos;
}
