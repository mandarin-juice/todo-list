import React from "react";

interface Props {
  children: React.ReactElement[];
}

function TodoList(props: Props) {
  const { children } = props;
  return (
    <div className="main">
      <ul id="todo-list" className="todo-list">
        {children}
      </ul>
    </div>
  );
}

export default TodoList;
