import { rest } from "msw";

export const handlers = [
  // Handles a POST /login request
  rest.post("/todo", (req, res, ctx) => {
    const storedTodos = localStorage.getItem("sy-todos");
    const todos = JSON.parse(storedTodos) || [];
    localStorage.setItem("sy-todos", JSON.stringify([...todos, req.body]));
    return res(ctx.status(200));
  }),
  rest.get("/todos", (req, res, ctx) => {
    const todos = localStorage.getItem("sy-todos");
    return res(
      ctx.status(200),
      ctx.json({
        todos,
      })
    );
  }),
];
