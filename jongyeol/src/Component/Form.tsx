import React, { useState, Dispatch, SetStateAction } from 'react'

type TodoType = {
    title: string,
    content?: string
}

type FormProps = {
    setTodos: Dispatch<SetStateAction<TodoType[]>>
}

function Form({ setTodos }: FormProps) {
    const [title, setTitle] = useState<string>();
    const [content, setContent] = useState<string>();

    const onsubmit = (e: React.SyntheticEvent) => {
        e.preventDefault();
        if (!title) {
           alert('제목을 입력하세요');
        }
        // @ts-ignore
        setTodos(prevState => {
            return [...prevState, {title, content}]
        })

        setTitle('')
        setContent('')
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
