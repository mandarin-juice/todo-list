export const getTodos = async () => {
  const todos = await fetch(`/api/todos`).then((res) => res.json());
  return todos as Todos;
};

export const addTodo = async (todo: Todo) => {
  return await fetch(`/api/todos`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(todo),
  });
};

export const updateTodo = async (todo: Todo) => {
  return await fetch(`/api/todos`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(todo),
  });
};

export const deleteTodo = async (todo: Todo) => {
  return await fetch(`/api/todos`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(todo),
  });
};
