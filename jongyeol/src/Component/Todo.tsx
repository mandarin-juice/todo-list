import styled from "styled-components";

type TodoProps = {
    id?: number,
    title: String,
    content?: String,
    deleteTodo: (id: number | undefined) => void
}

function Todo({id, title, content, deleteTodo}: TodoProps) {
    return(
        <Container>
            <h2>{title}</h2>
            <div>{content}</div>
            <div onClick={() => deleteTodo(id)}>삭제</div>
        </Container>
    )
}

const Container = styled.div`
  border: 1px solid darkorange;
  width: 200px;
`

export default Todo
