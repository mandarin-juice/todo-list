import React, { useEffect, useState } from "react";
import Todo from "./Component/Todo";
import Form from "./Component/Form";
import styled from 'styled-components'

type TodoType = {
    id: number,
    title: string,
    content?: string
}

function App() {
    const [todos, setTodos] = useState<TodoType[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        fetchTodos();
    }, []);

    const fetchTodos = async () => {
        try {
            const res = await fetch("/todos");
            const data = await res.json();
            setTodos(data.todos);
        } catch (err) {
            console.error('err:', err);
        } finally {
            setLoading(false);
        }
    }

    const deleteTodo = (id: number) => {
        setTodos(prevState => prevState.filter(todo => id !== todo.id))
    }

    if (loading) {
        return <h2>loading...</h2>
    }

    return (
        <Container>
            <h1>TodoList</h1>
            <Form setTodos={setTodos}/>
             {todos?.map(todo => {
                 return <Todo key={todo.title} id={todo.id} title={todo.title} content={todo?.content} deleteTodo={deleteTodo}/>
             })}
        </Container>
    )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

export default App;
