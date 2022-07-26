import React, { useState, useEffect } from "react";
import TodoApis from "@apis/todo";

function App() {
  const [todos, setTodos] = useState<Todos>([]);

  const loadTodos = async () => {
    const todos = await TodoApis.getTodos();
    if (todos.length > 0) {
      setTodos([...todos]);
    }
  };

  const init = async () => {
    await loadTodos();
  };

  useEffect(() => {
    init();
  }, []);

  const onSubmitTodo = async (event: TodoSubmitInputs) => {
    event.preventDefault();
    const { target } = event;
    const content = target.content.value.trim();

    if (content.length === 0) return;

    try {
      await TodoApis.createTodo({
        content,
      });

      await loadTodos();

      target.content.value = "";
    } catch (error: unknown) {
      console.log(error);
    }
  };

  // TODO : app style 파일 작성
  // TODO : Todos 컴포넌트 분리, style 파일 작성
  return (
    <div>
      {todos?.length > 0 &&
        todos.map(({ id, content, isDone }) => (
          <>
            <div>{`id : ${id}`}</div>
            <div>{`content : ${content}`}</div>
            <div>{`isDone : ${isDone.toString()}`}</div>
            <hr />
          </>
        ))}
      <form onSubmit={onSubmitTodo} autoComplete="off">
        <input type="text" name="content" placeholder="오늘 할 일을 메모하세요" />
      </form>
    </div>
  );
}

export default App;
