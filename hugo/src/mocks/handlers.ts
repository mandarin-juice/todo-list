import { rest } from "msw";
import { storageAvailable, makeId } from "@util";

const LOCAL_KEY_TODOS = "TODOS";

const tempStorage = () => {
  const data: {
    [key: string]: string;
  } = {};
  return {
    setItem: (key: string, value: unknown) => {
      data[key] = JSON.stringify(value);
    },
    getItem: (key: string) => {
      return data[key];
    },
  };
};

const storage = storageAvailable() ? window.localStorage : tempStorage();
const initialData = () => {
  const localData = storage.getItem(LOCAL_KEY_TODOS);
  if (localData === null) {
    return [];
  } else {
    return JSON.parse(localData);
  }
};

const todos = initialData();

export const handlers = [
  rest.post("/todo", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        id: 1,
      }),
    );
  }),

  rest.get("/todo", (_, res, ctx) => {
    return res(ctx.status(200), ctx.json(todos));
  }),

  rest.put("/todo", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        id: 1,
      }),
    );
  }),

  rest.delete("/todo", (req, res, ctx) => {
    return res(ctx.status(200));
  }),
];
