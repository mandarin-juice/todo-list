type TodoProps = {
    id: number,
    title: String,
    content?: String,
    deleteTodo: (id: number) => void
}

function Todo({id, title, content, deleteTodo}: TodoProps) {
    return(
        <>
            <h2>{title}</h2>
            <div>{content}</div>
            <div onClick={() => deleteTodo(id)}>삭제</div>
        </>
    )
}

export default Todo
