import React, { useState, Dispatch, SetStateAction } from 'react';
import { addTodo } from '../api';

type TodoType = {
  id?: number;
  title: string;
  content?: string;
  completed: number;
};

type FormProps = {
  handleFetchTodos: () => void;
  setTodos: Dispatch<SetStateAction<TodoType[]>>;
};

function Form({ handleFetchTodos }: FormProps) {
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');

  const resetInputs = () => {
    setTitle('');
    setContent('');
  };

  const onsubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (!title) {
      alert('제목을 입력하세요');
      return;
    }

    const resultCode = await addTodo(title, content);
    if (resultCode === 200) {
      handleFetchTodos();
    }
    resetInputs();
  };

  const handleChangeTitle = ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) =>
    setTitle(value);
  const handleChangeContent = ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) =>
    setContent(value);

  return (
    <form onSubmit={onsubmit}>
      <input value={title} onChange={handleChangeTitle} placeholder='제목' />
      <input value={content} onChange={handleChangeContent} placeholder='내용' />
      <input type='submit' />
    </form>
  );
}

export default Form;
