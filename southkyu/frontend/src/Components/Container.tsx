export default function Container({ children }: PropsType) {
  return (
    <div className="main">
      <input className="toggle-all" type="checkbox" />
      <ul id="todo-list" className="todo-list">
        {children}
      </ul>
    </div>
  );
}
