import axios from 'axios';

const API_HOST = 'http://127.0.0.1:8080';

export const fetchTodos = async () => {
  try {
    const res = await axios.get(`${API_HOST}/todos`);
    return res.data;
  } catch (e) {
    console.error(e);
  }
};

export const deleteTodo = async (id: number | undefined) => {
  try {
    const res = await fetch(`${API_HOST}/todo/${id}`, {
      method: 'DELETE',
    });
    return res.status;
  } catch (err) {
    console.error(err);
  }
};

export const addTodo = async (title: string, content: string) => {
  try {
    const res = await fetch(`${API_HOST}/todo`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, content }),
    });
    return res.status;
  } catch (e) {
    console.error(e);
  }
};

export const completeTodo = async (id: number, completed: boolean) => {
  console.log(completed);
  try {
    const res = await fetch(`${API_HOST}/todo/complete`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, completed }),
    });
    return res.status;
  } catch (e) {
    console.error(e);
  }
};
