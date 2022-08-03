import fastify, { FastifyPluginOptions } from "fastify";

import leveldb, { fastifyLeveldb } from "@fastify/leveldb";

import { TODO_KEY } from "./utils/constants";
import { Todo, TodoState } from "./types";

interface TodoQuerystring {
  state: string;
}

const server = fastify();

server.register(leveldb, { name: "db", path: "./local" });

async function getTodos(levelDb: FastifyPluginOptions) {
  let savedTodos;
  try {
    savedTodos = await levelDb.db.get(TODO_KEY);
  } catch (e: any) {
    levelDb.db.put(TODO_KEY, JSON.stringify([]));
    savedTodos = [];
  }
  if (!savedTodos.length) {
    return [];
  }
  return JSON.parse(savedTodos);
}

server.get<{
  Querystring: TodoQuerystring;
}>("/todos", async function (req, reply) {
  const savedTodos: Array<Todo> = await getTodos(this.level);

  let result: Array<Todo> = [];

  const filterState: string | null = req.query.state;

  if (filterState) {
    result = savedTodos.filter(({ state }) => {
      return state === filterState;
    });
    return result;
  }

  return savedTodos;
});

server.post<{
  Body: string;
}>("/todo", async function (req) {
  const savedTodos: Array<Todo> = await getTodos(this.level);

  let result = [];
  const newTodo = new Todo(req.body, TodoState.created);
  if (savedTodos === null) {
    result = [newTodo];
  } else {
    savedTodos.push(newTodo);

    result = savedTodos;
  }

  await this.level.db.put(TODO_KEY, JSON.stringify(result));
  return { message: "success", id: newTodo.key };
});

server.put<{
  Params: {
    todoId: string;
  };
  Body: Todo;
}>("/todo/:todoId", async function (req) {
  const savedTodos: Array<Todo> = await getTodos(this.level);

  if (!savedTodos.length) {
    throw new Error("No todos");
  }

  const targetId: string = req.params.todoId;
  const changingTodo: Todo = req.body;

  let targetIndex: number | undefined = savedTodos.findIndex(
    ({ key }) => key === targetId
  );

  if (targetIndex === -1) {
    throw new Error("No target todo");
  }

  const target = Todo.wrap(
    changingTodo.content || savedTodos[targetIndex].content, //
    changingTodo.state in TodoState
      ? changingTodo.state
      : savedTodos[targetIndex].state,
    targetId
  );
  target.update(
    changingTodo.content || target.content, //
    changingTodo.state in TodoState ? changingTodo.state : target.state //
  );

  savedTodos[targetIndex] = target;

  console.log("savedTodos", savedTodos);

  await this.level.db.put(TODO_KEY, JSON.stringify(savedTodos));

  return { message: "ok" };
});

server.delete<{
  Params: {
    todoId: string;
  };
}>("/todo/:todoId", async function (req) {
  const savedTodos: Array<Todo> = await getTodos(this.level);

  if (!savedTodos.length) {
    throw new Error("No todos");
  }

  const targetId: string = req.params.todoId;
  let targetIndex: number | undefined = savedTodos.findIndex(
    ({ key }) => key === targetId
  );

  if (targetIndex === -1) {
    throw new Error("No target todo");
  }
  savedTodos.splice(targetIndex, 1);

  await this.level.db.put(TODO_KEY, JSON.stringify(savedTodos));

  return { message: "ok" };
});

server.listen({ port: 8080 }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});
