const API_HOST = 'http://127.0.0.1:8080';

export const ping = async () => {
  const res = await fetch(`${API_HOST}/ping`, { mode: 'cors' });
  const data = await res.json();
  return data;
};

export const fetchTodos = async () => {
  const res = await fetch('/todos');
  const data = await res.json();
  return data.todos;
};

export const deleteTodo = async (id: number | undefined) => {
  const res = await fetch(`todo/${id}`, {
    method: 'DELETE',
  });
  const deleteResult = await res.json();
  return deleteResult;
};

export const addTodo = async (title: string, content: string) => {
  try {
    const res = await fetch('/todo', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, content }),
    });
    return res.json();
  } catch (e) {
    console.error(e);
  }
};
