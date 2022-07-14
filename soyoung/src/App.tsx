import React, { useState } from "react";
import "./App.css";

function App() {
  const [newTodo, setNewTodo] = useState("");
  const [todos, setTodos] = useState<string[]>([]);

  const onPressEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    /*
    React projects that don't include the DOM library need these interfaces to compile.
    React Native applications use React, but there is no DOM available. The JavaScript runtime
    is ES6/ES2015 only. These definitions allow such projects to compile with only `--lib ES6`.

    Warning: all of these interfaces are empty. If you want type definitions for various properties
    (such as HTMLInputElement.prototype.value), you need to add `--lib DOM` (via command line or tsconfig.json).
    */
    // if (e.isComposing)
    if (e.key !== "Enter" || !newTodo) return;
    setTodos([...todos, newTodo]);
    setNewTodo("");
  };

  const todoItem = (todoText: string) => (
    <li>
      <div className="view">
        <input className="toggle" type="checkbox" />
        <label className="label">{todoText}</label>
        <button className="destroy"></button>
      </div>
      <input className="edit" value={todoText} />
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
          onKeyUp={onPressEnter}
        />
      </div>
      <div className="main">
        <input className="toggle-all" type="checkbox" />
        <ul id="todo-list" className="todo-list">
          {todos.map((todo) => todoItem(todo))}
          {/* <li>
            <div className="view">
              <input className="toggle" type="checkbox" />
              <label className="label">새로운 타이틀</label>
              <button className="destroy"></button>
            </div>
            <input className="edit" value="새로운 타이틀" />
          </li>
          <li className="editing">
            <div className="view">
              <input className="toggle" type="checkbox" />
              <label className="label">수정중 타이틀</label>
              <button className="destroy"></button>
            </div>
            <input className="edit" value="수정중 타이틀" />
          </li>
          <li className="completed">
            <div className="view">
              <input className="toggle" type="checkbox" checked />
              <label className="label">완료된 타이틀</label>
              <button className="destroy"></button>
            </div>
            <input className="edit" value="완료된 타이틀" />
          </li> */}
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
