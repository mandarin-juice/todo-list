import React, { useState, useEffect } from "react";
import TodoApis from "@apis/todo";

function App() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {}, []);

  return <div className="App">This is Todo</div>;
}

export default App;
