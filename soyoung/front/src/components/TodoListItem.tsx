import { updateTodo, deleteTodo } from "../apis/todos";

interface TodoListItemProps {
  todo: Todo;
  fetchTodos: FetchTodos;
}

function TodoListItem({ todo, fetchTodos }: TodoListItemProps) {
  const onToggleTodo = async (todo: Todo) => {
    await updateTodo({ ...todo, completed: !todo.completed });
    fetchTodos();
  };

  const onDeleteTodo = async (todo: Todo) => {
    await deleteTodo(todo);
    fetchTodos();
  };

  return (
    <li
      key={`todo-item-${todo.id}`}
      className={todo.completed ? "completed" : ""}
    >
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
}

export default TodoListItem;
