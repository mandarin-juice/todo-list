import { rest } from "msw";

const store = window.localStorage;
const STORE_KEY = "TODO";

const getStore = () => JSON.parse(store.getItem(STORE_KEY) || "[]");
const addStore = (data) => {
  const todos = getStore();
  todos.push({ id: todos.length + 1, ...data });
  return store.setItem(STORE_KEY, JSON.stringify(todos));
};
export const handlers = [
  rest.get("/todo", (req, res, ctx) => {
    const data = getStore();
    return res(ctx.status(200), ctx.json(data));
  }),
  rest.post("/todo", (req, res, ctx) => {
    const { body: data } = req;

    addStore(data);
    return res(ctx.status(202), ctx.json({ ok: true }));
  }),
  rest.patch("/todo/:id", (req, res, ctx) => {
    const id = req.body;
    const todos = getStore();
    const newData = todos.map((item) => {
      if (item.id === id) {
        item.isCompleted = !item.isCompleted;
      }
      return item;
    });
    store.removeItem(STORE_KEY);
    store.setItem(STORE_KEY, JSON.stringify(newData));
    return res(ctx.status(202), ctx.json({ ok: true }));
  }),
  rest.delete(`/todo/:id`, (req, res, ctx) => {
    const id = req.body;
    const todos = getStore();
    const newTodo = todos.filter((item) => item.id !== +id);
    store.removeItem(STORE_KEY);
    store.setItem(STORE_KEY, JSON.stringify(newTodo));
    return res(ctx.status(202), ctx.json({ ok: true }));
  }),
];
