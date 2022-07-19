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

  rest.put(`${REQUEST_URL}/:id`, async (req, res, ctx) => {
    const { id } = req.params;
    const { text } = await req.json();
    if (typeof id === "string") updateTodo(Number.parseInt(id), text);
    // TODO: string[]를 가려낼 수 있는 타입가드로 수정
    else if (typeof id === "object") updateTodo(Number.parseInt(id[0]), text);
    return res(ctx.status(200));
  }),
  rest.delete(REQUEST_URL, () => {}),
];

const TODOS_ITEM_KEY = "todos";
const storage = window.localStorage;

const getTodos = (): Todo[] =>
  JSON.parse(storage.getItem(TODOS_ITEM_KEY) || "[]");

const addTodo = (text: string): number => {
  const items: Todo[] = getTodos();
  const ids = items.map(({ id }) => id);
  const id = ids.length > 0 ? Math.max(...ids) + 1 : 0;
  items.push({ id, text });
  storage.setItem(TODOS_ITEM_KEY, JSON.stringify(items));
  return id;
};

const updateTodo = (id: number, text: string) => {
  const todos: Todo[] = getTodos();
  const target = todos.find((todo) => todo.id === id);
  if (target) {
    target.text = text;
  }
  storage.setItem(TODOS_ITEM_KEY, JSON.stringify(todos));
};
