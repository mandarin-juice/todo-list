import styled from 'styled-components';
import { completeTodo, fetchTodos } from '../api';

type TodoProps = {
  id?: number;
  title: string;
  content?: string;
  completed: number;
  deleteTodo: (id: number | undefined) => void;
};

function Todo({ id, title, content, completed }: TodoProps) {
  const handleCompleteTodo = async (e: any) => {
    const resultCode = await completeTodo(e.target.name, e.target.checked);
    if (resultCode === 200) {
      fetchTodos();
    }
  };

  return (
    <Container>
      <Wrapper>
        <h2>{title}</h2>
        <div>{content}</div>
      </Wrapper>
      <DeleteWrapper>
        <DeleteButton>삭제</DeleteButton>
        <input
          type='checkbox'
          onChange={(e) => handleCompleteTodo(e)}
          name={id?.toString()}
          defaultChecked={!!completed}
        />
      </DeleteWrapper>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  background: seashell;
  width: 400px;
  padding: 20px;
  margin: 3px;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  flex: 5;
`;

const DeleteWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 2;
`;

const DeleteButton = styled.button`
  width: 40px;
`;

export default Todo;
