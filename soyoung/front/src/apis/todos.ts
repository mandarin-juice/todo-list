export const getTodos = async () => {
  const { todos } = await fetch("/todos").then((res) => res.json());
  return JSON.parse(todos) as Todos;
};

export const addTodo = async (todo: Todo) => {
  return await fetch("/todo", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(todo),
  });
};

export const updateTodo = async (todo: Todo) => {
  return await fetch("/todo", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(todo),
  });
};

export const deleteTodo = async (todo: Todo) => {
  return await fetch("/todo", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(todo),
  });
};
