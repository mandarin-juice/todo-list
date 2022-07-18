import { rest } from "msw";

export const handlers = [
  rest.post("/todo", (req, res, ctx) => {
    // Persist user's authentication in the session
    // sessionStorage.setItem("is-authenticated", "true");
    return res(
      // Respond with a 200 status code
      ctx.status(200)
    );
  }),
  rest.get("/todos", (req, res, ctx) => {
    // Check if the user is authenticated in this session
    // const isAuthenticated = sessionStorage.getItem("is-authenticated");
    // If not authenticated, respond with a 403 error
    return res(
      ctx.status(200),
      ctx.json({
        todos: [
            {id: 1, title: 'testTitle', content: 'testContent', createdAt: '2022-07-17'},
            {id: 2, title: 'testTitle2', content: 'testContent2', createdAt: '2022-07-18'},
            {id: 3, title: 'testTitle3', content: 'testContent3', createdAt: '2022-07-19'},
        ],
      })
    );
  }),
];
