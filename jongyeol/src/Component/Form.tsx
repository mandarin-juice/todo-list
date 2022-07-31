import React, { useState, Dispatch, SetStateAction } from 'react'

type TodoType = {
    id?: number,
    title: string,
    content?: string
}

type FormProps = {
    setTodos: Dispatch<SetStateAction<TodoType[]>>
}

function Form({ setTodos }: FormProps) {
    const [title, setTitle] = useState<string>();
    const [content, setContent] = useState<string>();

    const resetInputs = () => {
        setTitle('')
        setContent('')
    }

    const onsubmit = (e: React.SyntheticEvent) => {
        e.preventDefault();
        if (!title) {
           alert('제목을 입력하세요');
           return;
        }


        addTodo();
        setTodos(prevState => {
            return [...prevState, {title, content}]
        });
        resetInputs();
    }

    const addTodo = async () => {
        try {
            const res = await fetch("/todo", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ title, content })
            });
            return res.json();
        } catch (err) {
            console.error('err:', err);
        }
    }

    const handleChangeTitle = ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => setTitle(value);
    const handleChangeContent = ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => setContent(value);

    return(
        <>
            <form onSubmit={onsubmit}>
                <input value={title} onChange={handleChangeTitle} placeholder="제목" />
                <input value={content} onChange={handleChangeContent} placeholder="내용" />
                <input type="submit"/>
            </form>
        </>
    )
}

export default Form;
