import axios from "axios";

const API: TodoApiInterface = {
  getTodos: async () => {
    const { data: todos } = await axios.get("/todo");
    return todos;
  },
  createTodo: async ({ content }) => {
    const { data: result } = await axios.post("/todo", {
      content,
    });
    return result;
  },
  updateTodo: async ({ id, content, isDone }) => {
    try {
      const { data: result } = await axios.put("/todo", {
        id,
        content,
        isDone,
      });
      return result;
    } catch (error: unknown) {
      return null;
    }
  },
  deleteTodo: async ({ id }) => {
    const { data: result } = await axios.delete(`/todo/${id}`);
    return result;
  },
};

export default API;
