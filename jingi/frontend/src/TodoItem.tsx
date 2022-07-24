import React, { useEffect, useState } from "react";
import styled from "styled-components";

interface TodoItemProps {
  todo: Todo;
  onUpdate?: (todo: Todo) => {};
  onDelete?: (id: number) => {};
}

function TodoItem({ todo, onUpdate, onDelete }: TodoItemProps) {
  const [isDone, setIsDone] = useState<boolean>(todo.isDone);
  const [text, setText] = useState<string>(todo.text);

  const updateTodo = () => {
    if (onUpdate && (text !== todo.text || isDone !== todo.isDone))
      onUpdate({ ...todo, text, isDone });
  };

  useEffect(() => {
    updateTodo();
  }, [isDone]);

  return (
    <ItemContainer>
      <input
        type="checkbox"
        checked={isDone}
        onChange={(e) => {
          console.log(e.target.checked);
          setIsDone(e.target.checked);
        }}
      />
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onBlur={() => updateTodo()}
        onKeyDown={(e) => {
          if (e.code === "Enter") updateTodo();
        }}
      />
      <button onClick={() => onDelete && onDelete(todo.id)}>🗑</button>
    </ItemContainer>
  );
}

const ItemContainer = styled.li`
  display: flex;
  gap: 10px;
  padding: 5px;
`;

export default TodoItem;
