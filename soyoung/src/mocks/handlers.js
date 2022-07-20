import { rest } from "msw";

export const handlers = [
  rest.get("/todos", (req, res, ctx) => {
    const todos = localStorage.getItem("sy-todos");
    return res(
      ctx.status(200),
      ctx.json({
        todos,
      })
    );
  }),
  rest.post("/todo", (req, res, ctx) => {
    const storedTodos = localStorage.getItem("sy-todos");
    const todos = JSON.parse(storedTodos) || [];
    localStorage.setItem("sy-todos", JSON.stringify([...todos, req.body]));
    return res(ctx.status(200));
  }),
  rest.put("/todo", (req, res, ctx) => {
    const storedTodos = localStorage.getItem("sy-todos");
    const todos = JSON.parse(storedTodos) || [];
    const updatedTodos = todos.map((todo) =>
      todo.id === req.body.id ? { ...req.body } : todo
    );
    localStorage.setItem("sy-todos", JSON.stringify(updatedTodos));
    return res(ctx.status(200));
  }),
  rest.delete("/todo", (req, res, ctx) => {
    const storedTodos = localStorage.getItem("sy-todos");
    const todos = JSON.parse(storedTodos) || [];
    const filteredTodos = todos.filter((todo) => todo.id !== req.body.id);
    localStorage.setItem("sy-todos", JSON.stringify(filteredTodos));
    return res(ctx.status(200));
  }),
];
