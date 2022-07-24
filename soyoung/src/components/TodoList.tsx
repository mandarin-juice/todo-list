import TodoListItem from "./TodoListItem";

interface TodoListProps {
  todos: Todos;
}

function TodoList({ todos }: TodoListProps) {
  return (
    <ul id="todo-list" className="todo-list">
      {todos?.map((todo, index) => (
        <TodoListItem todo={todo} index={index} />
      ))}
    </ul>
  );
}

export default TodoList;
