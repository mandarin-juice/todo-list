import { rest } from "msw";
import { REQUEST_URL } from "../apis/todos";

export const handlers = [
  rest.get(REQUEST_URL, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(getTodos()));
  }),

  rest.post(REQUEST_URL, async (req, res, ctx) => {
    const { text } = await req.json();
    const id = addTodo(text);
    return res(ctx.status(200), ctx.json({ id }));
  }),

  rest.put(REQUEST_URL, () => {}),
  rest.delete(REQUEST_URL, () => {}),
];

const TODOS_ITEM_KEY = "todos";
const storage = window.localStorage;

const getTodos = (): Todo[] =>
  JSON.parse(storage.getItem(TODOS_ITEM_KEY) || "[]");

const addTodo = (text: string) => {
  const items: Todo[] = getTodos();
  items.push({ id: items.length, text });
  storage.setItem(TODOS_ITEM_KEY, JSON.stringify(items));
};
