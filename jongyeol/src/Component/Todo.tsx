type TodoProps = {
    title: String,
    content?: String
}

function Todo({title, content}: TodoProps) {
    return(
        <>
            <h2>{title}</h2>
            <div>{content}</div>
        </>
    )
}

export default Todo
