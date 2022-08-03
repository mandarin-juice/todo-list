import axios from "axios";

const API: TodoApiInterface = {
  getTodos: async () => {
    const { data: todos } = await axios.get("/todo");
    return todos;
  },
  createTodo: async ({ content }) => {
    try {
      const { data: result } = await axios.post("/todo", {
        content,
      });

      return result;
    } catch (error: unknown) {
      console.error(error);
    }
  },
  updateTodo: async ({ id, content, isDone }) => {
    try {
      await axios.put("/todo", {
        id,
        content,
        isDone,
      });
    } catch (error: unknown) {
      console.error(error);
    }
  },
  deleteTodo: async ({ id }) => {
    try {
      await axios.delete(`/todo/${id}`);
    } catch (error: unknown) {
      console.error(error);
    }
  },
};

export default API;
