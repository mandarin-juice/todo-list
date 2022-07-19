import { Todo, TodoApiInterface } from "./types";

const API: TodoApiInterface = {
  getTodos() {
    return [
      {
        id: 1,
        content: "test1",
      },
      {
        id: 2,
        content: "test2",
      },
      {
        id: 3,
        content: "test3",
      },
    ];
  },
};

export default API;
