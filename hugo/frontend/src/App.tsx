import React, { useState, useEffect } from "react";
import TodoApis from "@apis/todo";

function App() {
  const [todos, setTodos] = useState<Todos>([]);
  // const [loading, setLoading] = useState(false);

  const init = async () => {
    const todos = await TodoApis.getTodos();
    setTodos([...todos]);
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <div>
      This is Todo
      {todos?.length > 0 ? (
        todos.map(({ id, content, isDone }) => (
          <>
            <div>{id}</div>
            <div>{content}</div>
            <div>{isDone}</div>
          </>
        ))
      ) : (
        <div>make new Todo</div>
      )}
    </div>
  );
}

export default App;
