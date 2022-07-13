import React from "react";
import "./App.css";

function App() {
  return (
    <section className="todoapp">
      <div>
        <h1>TODOS</h1>
        <input
          id="new-todo-title"
          className="new-todo"
          placeholder="할일을 추가해주세요"
        />
      </div>
      <div className="main">
        <input className="toggle-all" type="checkbox" />
        <ul id="todo-list" className="todo-list">
          <li>
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
          </li>
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
