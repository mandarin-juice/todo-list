export const REQUEST_URL = "https://api.jingi.io/todos";

export const getTodos = async (): Promise<Todo[]> => {
  const response = await fetch(REQUEST_URL, {
    method: "GET",
  });
  const todos: Todo[] = await response.json();
  return todos;
};

export const createTodo = async (text: string): Promise<number> => {
  const response = await fetch(REQUEST_URL, {
    method: "POST",
    body: JSON.stringify({ text }),
  });
  const { id } = await response.json();
  return id;
};

export const updateTodo = async (id: number, text: string) => {
  await fetch(`${REQUEST_URL}/${id}`, {
    method: "PUT",
    body: JSON.stringify({ text }),
  });
};

export const deleteTodo = async (id: number) => {
  await fetch(`${REQUEST_URL}/${id}`, { method: "DELETE" });
};
