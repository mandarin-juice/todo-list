const BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const getTodos = async () => {
  const { todos } = await fetch(`${BASE_URL}/api/todos`).then((res) =>
    res.json()
  );
  return JSON.parse(todos) as Todos;
};

export const addTodo = async (todo: Todo) => {
  return await fetch(`${BASE_URL}/api/todos`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(todo),
  });
};

export const updateTodo = async (todo: Todo) => {
  return await fetch(`${BASE_URL}/api/todos`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(todo),
  });
};

export const deleteTodo = async (todo: Todo) => {
  return await fetch(`${BASE_URL}/api/todos`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(todo),
  });
};
