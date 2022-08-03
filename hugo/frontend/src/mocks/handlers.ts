import { rest } from "msw";
import { storageAvailable, makeId } from "@util";

const LOCAL_KEY_TODOS = "TODOS";

const tempStorage = () => {
  const data: {
    [key: string]: string;
  } = {};
  return {
    setItem: (key: string, value: string) => {
      data[key] = value;
    },
    getItem: (key: string) => {
      const value = data[key];
      if (value === undefined || value.length === 0) {
        return null;
      }
      return value;
    },
  };
};

const isStorageAvailable = storageAvailable();
const storage = isStorageAvailable === true ? window.localStorage : tempStorage();

const initialData = () => {
  const localData = getStorageData();
  if (localData === null) {
    setStorageData([]);
    return [];
  } else {
    return localData;
  }
};

const setStorageData = (value: unknown) => {
  const strValue = JSON.stringify(value);
  storage.setItem(LOCAL_KEY_TODOS, strValue);
};

const getStorageData = () => {
  const strValue = storage.getItem(LOCAL_KEY_TODOS);
  if (strValue === null) {
    return null;
  }
  return JSON.parse(strValue);
};

let todos: Todos = initialData();

export const handlers = [
  rest.post("/todo", async (req, res, ctx) => {
    const { content } = await req.json();

    const id = makeId();
    const newTodo: Todo = {
      id,
      content,
      isDone: false,
    };

    todos.push(newTodo);
    setStorageData(todos);

    return res(ctx.status(200), ctx.json(id));
  }),

  rest.get("/todo", (_, res, ctx) => {
    return res(ctx.status(200), ctx.json(todos));
  }),

  rest.put("/todo", async (req, res, ctx) => {
    const { id, content, isDone } = await req.json();

    const findTodo = todos.find((todo: Todo) => todo.id === id);
    if (findTodo === undefined) {
      return res(ctx.status(404), ctx.json(null));
    }

    const updatedTodo: Todo = { ...findTodo, content, isDone };
    todos = todos.map((todo) => {
      if (todo.id === id) {
        todo = { ...updatedTodo };
      }
      return todo;
    });
    setStorageData(todos);

    return res(ctx.status(200));
  }),

  rest.delete("/todo/:id", (req, res, ctx) => {
    const { id } = req.params;
    todos = todos.filter((todo) => todo.id !== Number(id));

    return res(ctx.status(200));
  }),
];
