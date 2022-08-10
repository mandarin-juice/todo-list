import React, { useEffect, useState } from 'react';
import Todo from './component/Todo';
import Form from './component/Form';
import styled from 'styled-components';
import { deleteTodo, fetchTodos } from './api';

type TodoType = {
  id?: number;
  title: string;
  content?: string;
  completed: number;
};

function App() {
  const [todos, setTodos] = useState<TodoType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    handleFetchTodos();
  }, []);

  const handleFetchTodos = async () => {
    try {
      const todos = await fetchTodos();
      setTodos(todos);
    } catch (err) {
      console.error('err:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteTodo = async (id: number | undefined) => {
    const deleteResultCode = await deleteTodo(id);
    if (deleteResultCode === 200) {
      handleFetchTodos();
    } else {
      alert('삭제 실패');
    }
  };

  if (loading) {
    return <h2>loading...</h2>;
  }

  return (
    <Container>
      <h1>TodoList</h1>
      <Form setTodos={setTodos} handleFetchTodos={handleFetchTodos} />
      {todos?.map((todo) => {
        return (
          <Todo
            key={todo.title}
            id={todo.id}
            title={todo.title}
            content={todo?.content}
            completed={todo?.completed}
            deleteTodo={handleDeleteTodo}
          />
        );
      })}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export default App;
