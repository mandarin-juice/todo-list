import React, { useState, useEffect } from "react";
import "./App.css";
import AddTodo from "./components/AddTodo";
import { getTodos } from "./apis/todos";
import TodoList from "./components/TodoList";

function App() {
  const [lastId, setLastId] = useState(0);
  const [todos, setTodos] = useState<Todos>([]);

  const fetchTodos = async () => {
    const todos = await getTodos();
    setTodos(todos);
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  useEffect(() => {
    const lastId = todos?.[todos?.length - 1]?.id || 0;
    setLastId(lastId + 1);
  }, [todos]);

  return (
    <section className="todoapp">
      <div>
        <h1>TODOS</h1>
        <AddTodo lastId={lastId} />
      </div>
      <div className="main">
        <TodoList todos={todos} />
      </div>
      <div className="count-container">
        <span className="todo-count">
          총 <strong>0</strong> 개
        </span>
        <ul className="filters">
          <li>
            <a className="all selected" href="#/">
              전체보기
            </a>
          </li>
          <li>
            <a className="active" href="#/active">
              해야할 일
            </a>
          </li>
          <li>
            <a className="completed" href="#/completed">
              완료한 일
            </a>
          </li>
        </ul>
      </div>
    </section>
  );
}

export default App;
