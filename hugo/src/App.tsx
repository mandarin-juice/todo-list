import React, { useState, useEffect } from "react";
import TodoApis from "@apis/todo";

function App() {
  // const [todos, setTodos] = useState([]);
  // const [loading, setLoading] = useState(false);

  const init = async () => {
    const data = await TodoApis.getTodos();
    console.log("data : ", data);
  };

  useEffect(() => {
    init();
  }, []);

  return <div className="App">This is Todo</div>;
}

export default App;
