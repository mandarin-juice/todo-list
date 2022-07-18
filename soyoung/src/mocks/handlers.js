import { rest } from "msw";

export const handlers = [
  // Handles a POST /login request
  rest.post("/todo", (req, res, ctx) => {
    const todos = sessionStorage.getItem("sy-todos");
    localStorage.setItem("sy-todos", [...todos, req]);
    return res(ctx.status(200));
  }),
  rest.get("/todos", (req, res, ctx) => {
    const todos = sessionStorage.getItem("sy-todos");
    return res(
      ctx.status(200),
      ctx.json({
        todos,
      })
    );
  }),
];
