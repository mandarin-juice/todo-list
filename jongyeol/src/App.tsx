import React, { useEffect, useState } from "react";
import Todo from "./Component/Todo";

function App() {
    const [todos, setTodos] = useState<any[]>([]);
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

    if (loading) {
        return <h2>loading...</h2>
    }

    return (
        <>
            <h1>TodoList</h1>
             {todos?.map(todo => {
                 return <Todo key={todo.title} title={todo.title} content={todo.content}/>
             })}
        </>
    )
}

export default App;
