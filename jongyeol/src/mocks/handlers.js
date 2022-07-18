import { rest } from "msw";

const todosInitData = [
    {id: 1, title: 'testTitle', content: 'testContent', createdAt: '2022-07-17'},
    {id: 2, title: 'testTitle2', content: 'testContent2', createdAt: '2022-07-18'},
    {id: 3, title: 'testTitle3', content: 'testContent3', createdAt: '2022-07-19'},
]

export const handlers = [
    rest.get("/init", (req, res, ctx) => {
        localStorage.setItem('todos', JSON.stringify(todosInitData))
        return res(
            ctx.status(200),
        );
    }),

  rest.post("/todo", async (req, res, ctx)  => {
      const todos = JSON.parse(window.localStorage.getItem("todos"));
      const newTodo = await req.json()
      todos.push(newTodo);
      localStorage.setItem('todos', JSON.stringify(todos))

      return res(
        ctx.status(200)
    );
  }),

  rest.get("/todos", (req, res, ctx) => {
      // localStorage.setItem('todos', JSON.stringify(todosInitData))
      const data = JSON.parse(window.localStorage.getItem("todos"));

      return res(
        ctx.status(200),
        ctx.json({
            todos: data,
        })
    );
  }),
];
