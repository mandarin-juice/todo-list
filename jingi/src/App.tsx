import React, { useState } from "react";
import styled from "styled-components";

function App() {
  const [newItemText, setNewItemText] = useState("");
  const [itemList, setItemList] = useState<string[]>([]);

  return (
    <MainContainer>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setItemList((prevList): string[] => {
            prevList.push(newItemText);
            setNewItemText("");
            console.log(prevList);
            return prevList;
          });
        }}
      >
        <input
          type="text"
          name="item"
          onChange={(e) => {
            console.log(e.target.value);
            setNewItemText(e.target.value);
          }}
          value={newItemText}
        />
      </form>
      <ul id="todo-list">
        {itemList.map((item, index) => (
          <li key={index}>{item}</li>
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
  padding-top: 50px;
`;
