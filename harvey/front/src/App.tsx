import React, { useEffect, useState } from "react";
import List from "./components/List/List";
import "./App.css";
import HeaderOne from "./components/HeaderOne/List";
import { TodoState, Todo, PageState, TodoOnPage } from "./types";

const ENTER_KEY: string = "Enter";

const TODO_STATE_EMOJI_MAP = {
  [TodoState.created]: "🆕",
  [TodoState.progress]: "⏳",
  [TodoState.done]: "✅ ",
};
const updateTodoRequest = async (key: string, body: string) => {
  return await fetch(`/todo/${key}`, {
    method: "put",
    headers: {
      "Content-Type": "application/json",
    },
    body,
  }).then((response) => response.json());
};

const deleteTodoRequest = async (key: string) => {
  return await fetch(`/todo/${key}`, {
    method: "delete",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((response) => response.json());
};

function App() {
  const test = () => {
    fetch("/login", { method: "POST" })
      .then((response) => response.json())
      .then((data) => console.log(data));
  };

  const addTodo = (todo: string) => {
    fetch("/todo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: todo,
    })
      .then((response) => response.json())
      .then((data) => getTodos());
  };

  const getTodos = (state?: TodoState) => {
    fetch(`/todos${state === undefined ? "" : `?state=${state}`}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data: Array<Todo>) => {
        const todoOnPage: Array<TodoOnPage> = data.map((todo) => ({
          ...todo,
          pageState: PageState.view,
        }));
        setTodos(todoOnPage);
      });
  };

  const [todoInput, setTodoInputTodo] = useState("");
  const [todos, setTodos] = useState<Array<TodoOnPage>>([]);
  const [editingContent, setEditingContent] = useState<{
    [key: string]: string;
  }>({});

  const onChangetodoInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    setTodoInputTodo(e.target.value);
  };
  const onTypeEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === ENTER_KEY && todoInput) {
      addTodo(todoInput);
    }
    console.log(e);
  };

  const deleteTodo = async (key: string) => {
    await deleteTodoRequest(key);
    getTodos();
  };
  const changeTodoStateState = async (key: string, state: TodoState) => {
    await updateTodoRequest(
      key,
      JSON.stringify({
        state,
      })
    );
    getTodos();
  };

  const showActionButtons = (state: TodoState, key: string) => {
    if (state === TodoState.created) {
      return (
        <>
          <button
            className="progress"
            onClick={() => changeTodoStateState(key, TodoState.progress)}
          ></button>
          <button
            className="done"
            onClick={() => changeTodoStateState(key, TodoState.done)}
          ></button>
        </>
      );
    }
    if (state === TodoState.progress) {
      return (
        <>
          <button
            className="new"
            onClick={() => changeTodoStateState(key, TodoState.created)}
          ></button>
          <button
            className="done"
            onClick={() => changeTodoStateState(key, TodoState.done)}
          ></button>
        </>
      );
    }
    if (state === TodoState.done) {
      return (
        <>
          <button
            className="new"
            onClick={() => changeTodoStateState(key, TodoState.created)}
          ></button>
          <button
            className="progress"
            onClick={() => changeTodoStateState(key, TodoState.progress)}
          ></button>
        </>
      );
    }
  };

  const editContent = (targetKey: string) => {
    const targetIndex = todos.findIndex(({ key }) => key === targetKey);
    console.log("targetIndex", targetIndex);
    if (targetIndex === undefined) {
      return;
    } else {
      const targetTodo = todos[targetIndex];
      targetTodo.pageState = PageState.edit;
      const copiedTodos = todos.slice();
      copiedTodos[targetIndex] = targetTodo;
      setTodos(copiedTodos);

      editingContent[targetKey] = targetTodo.content;
      setEditingContent(editingContent);
    }
  };

  const changeEditingContent = (
    e: React.KeyboardEvent<HTMLInputElement>,
    key: string
  ) => {
    let target: {
      [key: string]: string;
    } = { ...editingContent };
    target[key] = e.target.value;
    setEditingContent(target);
  };

  const submitChangeEditingContent = async (
    e: React.KeyboardEvent<HTMLInputElement>,
    key: string
  ) => {
    if (e.key !== ENTER_KEY) {
      return;
    }
    await updateTodoRequest(
      key,
      JSON.stringify({
        content: editingContent[key],
      })
    );
    getTodos();
  };

  const showTodosByState = (
    e: React.MouseEvent<HTMLElement>,
    state?: TodoState
  ) => {
    e.preventDefault();
    if (state === null) {
      getTodos();
      return;
    }
    getTodos(state);
  };

  useEffect(() => {
    getTodos();
  }, []);

  return (
    <div className="App">
      <section className="todoapp">
        <div>
          <h1>TODOS</h1>
          <input
            id="new-todo-title"
            className="new-todo"
            placeholder="할일을 추가해주세요"
            autoFocus
            value={todoInput}
            onKeyUp={onTypeEnter}
            onChange={onChangetodoInput}
          />
        </div>
        <div className="main">
          <input className="toggle-all" type="checkbox" />
          <ul id="todo-list" className="todo-list">
            {todos.map(({ key, content, state, pageState }: TodoOnPage) => {
              return (
                <li key={key} className={pageState}>
                  <div className="view">
                    <span>{TODO_STATE_EMOJI_MAP[state]}</span>
                    <label className="label" onClick={() => editContent(key)}>
                      {content}
                    </label>

                    <div className="actions">
                      {showActionButtons(state, key)}
                      <button
                        className="destroy"
                        onClick={() => deleteTodo(key)}
                      ></button>
                    </div>
                  </div>
                  <input
                    className="edit"
                    value={editingContent[key]}
                    onChange={(e: React.KeyboardEvent<HTMLInputElement>) =>
                      changeEditingContent(e, key)
                    }
                    onKeyUp={(e: React.KeyboardEvent<HTMLInputElement>) =>
                      submitChangeEditingContent(e, key)
                    }
                  />
                </li>
              );
            })}
          </ul>
        </div>
        <div className="count-container">
          <span className="todo-count">
            총 <strong>{todos.length}</strong> 개
          </span>
          <ul className="filters">
            <li>
              <a className="all selected" onClick={(e) => showTodosByState(e)}>
                전체보기
              </a>
            </li>
            <li>
              <a
                className="active"
                onClick={(e) => showTodosByState(e, TodoState.created)}
              >
                해야할 일
              </a>
            </li>
            <li>
              <a
                className="completed"
                onClick={(e) => showTodosByState(e, TodoState.done)}
              >
                완료한 일
              </a>
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
}

export default App;
