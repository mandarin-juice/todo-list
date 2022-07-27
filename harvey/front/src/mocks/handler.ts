import { rest } from "msw";
import { TodoState, Todo } from "../types";
// import { Todo } from "../types";

export const handlers = [
  rest.get("/todos", (req, res, ctx) => {
    const savedTodos: string | null = localStorage.getItem("harvey-todos");
    let result: Array<Todo>;

    const filterState: string | null = req.url.searchParams.get("state");

    if (savedTodos === null) {
      result = [];
    } else {
      result = JSON.parse(savedTodos);
    }
    if (filterState) {
      result = result.filter(({ state }) => {
        return state === filterState;
      });
    }

    return res(
      // Respond with a 200 status code
      ctx.status(200),
      ctx.json(result)
    );
  }),
  rest.post("/todo", async (req, res, ctx) => {
    // Persist user's authentication in the session

    const savedTodos: string | null = localStorage.getItem("harvey-todos");

    let result = [];
    if (savedTodos === null) {
      result = [new Todo(await req.text(), TodoState.created)];
    } else {
      const todos: Array<Todo> = JSON.parse(savedTodos);
      const todo: string = await req.text();
      todos.push(new Todo(todo, TodoState.created));

      result = todos;
      //   localStorage.setItem("harvey-todos", JSON.stringify(todos));
      //   todos.push(req)
    }
    localStorage.setItem("harvey-todos", JSON.stringify(result));

    return res(
      // Respond with a 200 status code
      ctx.status(200),
      ctx.json({
        message: "success",
      })
    );
  }),
  rest.put("/todo/:todoId", async (req, res, ctx) => {
    // Persist user's authentication in the session

    const savedTodos: string | null = localStorage.getItem("harvey-todos");

    let result = [];

    if (savedTodos === null) {
      return res(
        // Respond with a 200 status code
        ctx.status(404),
        ctx.json({
          message: "no todos",
        })
      );
    }

    console.log("savedTodos", savedTodos);

    const todos: Array<Todo> = JSON.parse(savedTodos);
    const targetId: string = req.params.todoId.toString();
    const changingTodo: Todo = await req.json();
    console.log("targetId", targetId);
    console.log("todos", todos);
    console.log("changingTodo", changingTodo);
    let targetIndex: number | undefined = todos.findIndex(
      ({ key }) => key === targetId
    );

    if (targetIndex === -1) {
      return res(
        // Respond with a 200 status code
        ctx.status(404),
        ctx.json({
          message: "no target todo",
        })
      );
    }

    const target = Todo.wrap(
      changingTodo.content || todos[targetIndex].content, //
      changingTodo.state in TodoState
        ? changingTodo.state
        : todos[targetIndex].state,
      targetId
    );
    target.update(
      changingTodo.content || target.content, //
      changingTodo.state in TodoState ? changingTodo.state : target.state //
    );

    todos[targetIndex] = target;

    localStorage.setItem("harvey-todos", JSON.stringify(todos));
    //   todos.push(req)

    return res(
      // Respond with a 200 status code
      ctx.status(200),
      ctx.json({
        message: "success",
      })
    );
  }),

  rest.delete("/todo/:todoId", async (req, res, ctx) => {
    // Persist user's authentication in the session

    const savedTodos: string | null = localStorage.getItem("harvey-todos");

    let result = [];

    if (savedTodos === null) {
      return res(
        // Respond with a 200 status code
        ctx.status(404),
        ctx.json({
          message: "no todos",
        })
      );
    }
    const todos: Array<Todo> = JSON.parse(savedTodos);
    const targetId: string = req.params.todoId.toString();

    console.log("targetId", targetId);
    console.log("todos", todos);
    // console.log("changingTodo", changingTodo);
    let targetIndex: number | undefined = todos.findIndex(
      ({ key }) => key === targetId
    );

    if (targetIndex === -1) {
      return res(
        // Respond with a 200 status code
        ctx.status(404),
        ctx.json({
          message: "no target todo",
        })
      );
    }
    todos.splice(targetIndex, 1);

    localStorage.setItem("harvey-todos", JSON.stringify(todos));

    return res(
      // Respond with a 200 status code
      ctx.status(200),
      ctx.json({
        message: "success",
      })
    );
  }),
];
