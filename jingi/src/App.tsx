import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { getTodos, createTodo } from "./apis/todos";
import TodoItem from "./TodoItem";

function App() {
  const [newTodoText, setNewTodoText] = useState("");
  const [todos, setTodos] = useState<Todo[]>([]);

  const initItems = async () => {
    const items = await getTodos();
    setTodos(items);
  };

  const addItem = async () => {
    const id = await createTodo(newTodoText);
    setTodos((prevList) => {
      setNewTodoText("");
      return [...prevList, { id, text: newTodoText }];
    });
  };

  useEffect(() => {
    initItems();
  }, []);

  return (
    <MainContainer>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          await addItem();
        }}
      >
        <input
          type="text"
          name="item"
          onChange={(e) => setNewTodoText(e.target.value)}
          value={newTodoText}
        />
        <button type="submit">+</button>
      </form>
      <ul id="todo-list">
        {todos.map((item) => (
          <TodoItem key={item.id} todo={item} />
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
