import { Todo, TodoState, TodoOnPage, PageState } from "../types";

const IS_STAGING = process.env.REACT_APP_ENVIRONMENT === "staging";
const URL = IS_STAGING ? "" : "";

const updateTodoRequest = async (key: string, body: string) => {
  return await fetch(`${URL}/todo/${key}`, {
    method: "put",
    headers: {
      "Content-Type": "application/json",
    },
    body,
  }).then((response) => response.json());
};

const deleteTodoRequest = async (key: string) => {
  return await fetch(`${URL}/todo/${key}`, {
    method: "delete",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((response) => response.json());
};

const getTodos = async (state?: TodoState) => {
  return await fetch(
    `${URL}/todos${state === undefined ? "" : `?state=${state}`}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  )
    .then((response) => response.json())
    .then((data: Array<Todo>) => {
      const todoOnPage: Array<TodoOnPage> = data.map((todo) => ({
        ...todo,
        pageState: PageState.view,
      }));
      return todoOnPage;
    });
};

const addTodo = async (todo: string) => {
  return await fetch(`${URL}/todo`, {
    method: "POST",
    headers: {
      "Content-Type": "text/plain",
    },
    body: todo,
  }).then((response) => response.json());
};

export { updateTodoRequest, deleteTodoRequest, getTodos, addTodo };
