import { rest } from "msw";

export const handlers = [
  rest.get("https://api.jingi.io/todos", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json([{ id: 1, text: "test" }]));
  }),
  rest.post("/todos", () => {}),
  rest.put("/todos", () => {}),
  rest.delete("/todos", () => {}),
];
