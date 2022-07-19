import React, { useState } from "react";
import styled from "styled-components";

interface TodoItemProps {
  todo: Todo;
  onUpdate?: (id: number, text: string) => {};
  onDelete?: (id: number) => {};
}

function TodoItem({ todo, onUpdate, onDelete }: TodoItemProps) {
  const [text, setText] = useState<string>(todo.text);

  const updateTodo = () => {
    if (onUpdate && text !== todo.text) onUpdate(todo.id, text);
  };

  return (
    <ItemContainer>
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
