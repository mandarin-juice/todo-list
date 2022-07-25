import React, { useState } from "react";
import { addTodo } from "../apis/todos";

type AddTodoProps = {
  fetchTodos: FetchTodos;
};

function AddTodo({ fetchTodos }: AddTodoProps) {
  const [newTodo, setNewTodo] = useState("");

  const onSubmitHandler: React.FormEventHandler<HTMLFormElement> = async (
    e
  ) => {
    if (!newTodo) return;
    e.preventDefault();

    const id = new Date().getTime();
    const addedTodo = { id, text: newTodo, completed: false };
    await addTodo(addedTodo);
    fetchTodos();
    setNewTodo("");
  };

  return (
    <form onSubmit={onSubmitHandler}>
      <input
        id="new-todo-title"
        className="new-todo"
        placeholder="할일을 추가해주세요"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
      />
    </form>
  );
}

export default AddTodo;
