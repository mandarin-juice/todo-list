const API_URL = process.env.REACT_APP_API_URL;
export const REQUEST_URL = API_URL
  ? `${API_URL}/todos`
  : "https://api.jingi.io/todos";

export const getTodos = async (): Promise<Todo[]> => {
  const response = await fetch(REQUEST_URL, {
    method: "GET",
  });
  const todos: Todo[] = await response.json();
  return todos;
};

export const createTodo = async (
  text: string,
  isDone: boolean
): Promise<number> => {
  const response = await fetch(REQUEST_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text, isDone }),
  });
  const { id } = await response.json();
  return id;
};

export const updateTodo = async (todo: Todo) => {
  const { id, ...others } = todo;
  await fetch(`${REQUEST_URL}/${id}`, {
    method: "PUT",
    body: JSON.stringify({ ...others }),
  });
};

export const deleteTodo = async (id: number) => {
  await fetch(`${REQUEST_URL}/${id}`, { method: "DELETE" });
};
