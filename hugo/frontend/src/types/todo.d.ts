declare type Todo = {
  id: number;
  content: string;
  isDone: boolean;
};

declare type Todos = Array<Todo>;

declare interface TodoApiInterface {
  getTodos: () => Promise<AxiosResponse<Todos>>;
  createTodo: (input: Pick<Todo, "content">) => Promise<AxiosResponse<{ id: number }>>;
  updateTodo: (input: Todo) => Promise<AxiosResponse<Todo | null>>;
  deleteTodo: (input: Pick<Todo, "id">) => Promise<Todos>;
}

interface TodoFormElements extends HTMLFormElement {
  content: HTMLInputElement;
}

declare interface TodoSubmitInputs extends React.FormEvent<HTMLFormElement> {
  target: TodoFormElements;
}
