import React from "react";
import styled from "styled-components";

interface TodoItemProps {
  todoItem: Todo;
}

function TodoItem({ todoItem }: TodoItemProps) {
  return (
    <ItemContainer>
      <div>{todoItem.text}</div>
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
