import { rest } from "msw";

export const handlers = [
  rest.post("/todo", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        id: 1,
      }),
    );
  }),

  rest.get("/todo", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json([
        {
          id: 1,
          content: "test",
        },
      ]),
    );
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
