import React, { useRef } from "react";

export default function Input({ addTodo }: Types) {
  const inputRef = useRef(undefined);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addTodo(inputRef?.current?.value);
    inputRef.current.value = "";
  };

  return (
    <form onSubmit={onSubmit}>
      <input
        ref={inputRef}
        id="new-todo-title"
        className="new-todo"
        placeholder="할일을 추가해주세요"
      />
    </form>
  );
}
