import { rest } from "msw";
import { REQUEST_URL } from "../apis/todos";

export const handlers = [
  rest.get(REQUEST_URL, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(getTodos()));
  }),

  rest.post(REQUEST_URL, async (req, res, ctx) => {
    const { text, isDone } = await req.json();
    const id = addTodo(text, isDone);
    return res(ctx.status(200), ctx.json({ id }));
  }),

  rest.put(`${REQUEST_URL}/:id`, async (req, res, ctx) => {
    // const { id } = req.params;
    const id =
      typeof req.params.id === "string" ? req.params.id : req.params.id[0];
    const values = await req.json();
    const newTodo: Todo = { id: Number.parseInt(id), ...values };
    updateTodo(newTodo);
    return res(ctx.status(200));
  }),
  rest.delete(`${REQUEST_URL}/:id`, (req, res, ctx) => {
    const id =
      typeof req.params.id === "string" ? req.params.id : req.params.id[0];
    deleteTodo(Number.parseInt(id));
    return res(ctx.status(200));
  }),
];

const TODOS_ITEM_KEY = "todos";
const storage = window.localStorage;

const getTodos = (): Todo[] =>
  JSON.parse(storage.getItem(TODOS_ITEM_KEY) || "[]");

const addTodo = (text: string, isDone: boolean): number => {
  const items: Todo[] = getTodos();
  const ids = items.map(({ id }) => id);
  const id = ids.length > 0 ? Math.max(...ids) + 1 : 0;
  items.push({ id, text, isDone });
  storage.setItem(TODOS_ITEM_KEY, JSON.stringify(items));
  return id;
};

const updateTodo = (newTodo: Todo) => {
  const todos: Todo[] = getTodos();
  const newTodos = todos.map((todo) =>
    todo.id === newTodo.id ? newTodo : todo
  );
  storage.setItem(TODOS_ITEM_KEY, JSON.stringify(newTodos));
};

const deleteTodo = (id: number) => {
  const todos: Todo[] = getTodos();
  storage.setItem(
    TODOS_ITEM_KEY,
    JSON.stringify(todos.filter((todo) => todo.id !== id))
  );
};
