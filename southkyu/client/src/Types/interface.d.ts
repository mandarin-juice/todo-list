interface PropsType {
  children?: React.ReactNode;
}

interface MutationResponse {
  url: string;
  method: string;
}

interface Todo {
  id: number;
  title: string;
  isCompleted: boolean;
}

interface Types {
  addTodo: (data: Todo) => void;
}

interface ItemProps {
  item: Todo;
  data: Todo[];
  setState: React.Dispatch<React.SetStateAction<object>>;
}

interface useFetchState {
  loading: boolean;
  data?: any;
}
