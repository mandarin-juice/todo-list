import "./App.css";
import AddTodo from "./components/AddTodo";
import TodoList from "./components/TodoList";
import useFetch from "./hooks/useFetch";

function App() {
  const [todos, fetchTodos] = useFetch();

  return (
    <section className="todoapp">
      <div>
        <h1>TODOS</h1>
        <AddTodo fetchTodos={fetchTodos} />
      </div>
      <div className="main">
        <TodoList todos={todos} fetchTodos={fetchTodos} />
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
