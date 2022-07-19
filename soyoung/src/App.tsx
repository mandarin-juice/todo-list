import React, { useState, useEffect, useReducer } from "react";
import "./App.css";

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}
type Todos = Array<Todo>;

type Action = { type: string; todos: Todos };

function reducer(state: Todos, action: Action): Todos {
  switch (action.type) {
    case "FETCH_TODOS":
      return [...action.todos];
    default:
      throw new Error("Unhandled action");
  }
}

const getTodos = async () => {
  const { todos } = await fetch("/todos").then((res) => res.json());
  const parsedData = JSON.parse(todos) as Todos;
  return { type: "FETCH_TODOS", todos: parsedData || [] };
};

const addTodo = async (todo: Todo) => {
  return await fetch("/todo", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(todo),
  });
};

const updateTodo = async (todo: Todo) => {
  return await fetch("/todo", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(todo),
  });
};

const deleteTodo = async (todo: Todo) => {
  return await fetch("/todo", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(todo),
  });
};

function App() {
  const [lastId, setLastId] = useState(0);
  const [newTodo, setNewTodo] = useState("");
  const [todos, dispatch] = useReducer(reducer, []);

  const fetchTodos = async () => {
    dispatch(await getTodos());
  };

  const onToggleTodo = async (todo: Todo) => {
    await updateTodo({ ...todo, completed: !todo.completed });
    fetchTodos();
  };

  const onDeleteTodo = async (todo: Todo) => {
    await deleteTodo(todo);
    fetchTodos();
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  useEffect(() => {
    const lastId = todos?.[todos?.length - 1]?.id || 0;
    setLastId(lastId + 1);
  }, [todos]);

  const onPressEnter = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== "Enter" || !newTodo) return;
    const addedTodo = { id: lastId, text: newTodo, completed: false };
    setNewTodo("");
    await addTodo(addedTodo);
    fetchTodos();
  };

  const todoItem = (todo: Todo, index: number) => (
    <li className={todo.completed ? "completed" : ""}>
      <div className="view">
        <input
          className="toggle"
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggleTodo(todo)}
        />
        <label className="label">{todo.text}</label>
        <button className="destroy" onClick={() => onDeleteTodo(todo)}></button>
      </div>
      <input className="edit" value={todo.text} />
    </li>
  );

  return (
    <section className="todoapp">
      <div>
        <h1>TODOS</h1>
        <input
          id="new-todo-title"
          className="new-todo"
          placeholder="할일을 추가해주세요"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          // onKeyDown으로 하면 한글 입력 시 isComposing 이슈로 인해 마지막 글자가 중복으로 입력되는데
          // React.KeyboardEvent<T> interface에 isComposing 속성이 구현되어있지 않아서 onKeyUp으로 대체
          // 관련 링크 - https://levelup.gitconnected.com/javascript-events-handlers-keyboard-and-load-events-1b3e46a6b0c3
          onKeyUp={onPressEnter}
        />
      </div>
      <div className="main">
        <input className="toggle-all" type="checkbox" />
        <ul id="todo-list" className="todo-list">
          {todos?.map((todo, index) => todoItem(todo, index))}
        </ul>
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
