import { useState, useEffect } from "react";
import { getTodos } from "../apis/todos";

type ReturnType = [Todos, () => void];

function useFetch(): ReturnType {
  const [todos, setTodos] = useState<Todos>([]);

  const fetchTodos = async () => {
    const todos = await getTodos();
    setTodos(todos);
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return [todos, fetchTodos];
}

export default useFetch;
