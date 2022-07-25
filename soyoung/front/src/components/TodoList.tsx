import TodoListItem from "./TodoListItem";

interface TodoListProps {
  todos: Todos;
  fetchTodos: FetchTodos;
}

function TodoList({ todos, fetchTodos }: TodoListProps) {
  return (
    <ul id="todo-list" className="todo-list">
      {todos?.map((todo) => (
        <TodoListItem key={todo.id} todo={todo} fetchTodos={fetchTodos} />
      ))}
    </ul>
  );
}

export default TodoList;
