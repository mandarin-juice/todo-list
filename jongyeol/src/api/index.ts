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
