import { TodoApiInterface } from "./types";
import axios from "axios";

const API: TodoApiInterface = {
  getTodos: async () => {
    const todos = await axios.get("/todo");
    return todos;
  },
  createTodo: async ({ content }) => {
    const result = await axios.post("/todo", {
      content,
    });
    return result;
  },
  updateTodo: async ({ id, content }) => {
    const result = await axios.put("/todo", {
      id,
      content,
    });
    return result;
  },
  deleteTodo: async ({ id }) => {
    await axios.delete("/todo", {
      params: {
        id,
      },
    });
    return;
  },
};

export default API;
