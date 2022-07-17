import React, { useEffect, useState } from "react";
import styled from "styled-components";
import TodoItem from "./TodoItem";

function App() {
  const [newItemText, setNewItemText] = useState("");
  const [items, setItems] = useState<Todo[]>([]);

  const initItems = async () => {
    const response = await fetch("https://api.jingi.io/todos", {
      method: "GET",
    });
    const items = await response.json();
    setItems(items);
  };

  useEffect(() => {
    initItems();
  }, []);

  return (
    <MainContainer>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setItems((prevList) => {
            setNewItemText("");
            return [...prevList, { id: Math.random(), text: newItemText }];
          });
        }}
      >
        <input
          type="text"
          name="item"
          onChange={(e) => {
            setNewItemText(e.target.value);
          }}
          value={newItemText}
        />
        <button type="submit">+</button>
      </form>
      <ul id="todo-list">
        {items.map((item, index) => (
          <TodoItem key={index} todoItem={item} />
        ))}
      </ul>
    </MainContainer>
  );
}

export default App;

const MainContainer = styled.main`
  background-color: #1abc9c;
  width: 600px;
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 50px 0;
`;
