import React from "react";
import styled from "styled-components";

interface TodoItemProps {
  todo: Todo;
}

function TodoItem({ todo }: TodoItemProps) {
  return (
    <ItemContainer>
      <div>{todo.text}</div>
      <button>✏️</button>
      <button>🗑</button>
    </ItemContainer>
  );
}

const ItemContainer = styled.li`
  display: flex;
  gap: 10px;
  padding: 5px;
`;

export default TodoItem;
