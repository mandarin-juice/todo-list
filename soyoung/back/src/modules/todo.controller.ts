import { FastifyReply, FastifyRequest } from "fastify";
import { createTodo, findTodos, updateTodo, deleteTodo } from "./todo.service";

export async function registerTodoHandler(
  request: FastifyRequest<{
    Body: CreateTodoParams;
  }>,
  reply: FastifyReply
) {
  const body = request.body;

  try {
    const todoId = await createTodo(body);
    return reply.code(201).send(todoId);
  } catch (e) {
    console.log(e);
    return reply.code(500).send(e);
  }
}

export async function getTodosHandler(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const todos = await findTodos();
    return reply.code(200).send(todos);
  } catch (e) {
    console.log(e);
    return reply.code(500).send(e);
  }
}

export async function updateTodoHandler(
  request: FastifyRequest<{
    Body: UpdateTodoParams;
  }>,
  reply: FastifyReply
) {
  const body = request.body;

  try {
    const todoId = await updateTodo(body);
    return reply.code(200).send(todoId);
  } catch (e) {
    console.log(e);
    return reply.code(500).send(e);
  }
}

export async function deleteTodoHandler(
  request: FastifyRequest<{
    Params: DeleteTodoParams;
  }>,
  reply: FastifyReply
) {
  const params = request.params;

  try {
    const todoId = await deleteTodo(params);
    return reply.code(200).send(todoId);
  } catch (e) {
    console.log(e);
    return reply.code(500).send(e);
  }
}
