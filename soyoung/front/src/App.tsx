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
          총 <strong>{todos?.length}</strong> 개
        </span>
      </div>
    </section>
  );
}

export default App;
