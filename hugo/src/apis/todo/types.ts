import { AxiosResponse } from "axios";

export type Todo = {
  id: number;
  content: string;
  isDone: boolean;
};

export type Todos = Array<Todo>;

export interface TodoApiInterface {
  getTodos: () => Promise<AxiosResponse<Todos>>;
  createTodo: (input: Pick<Todo, "content">) => Promise<AxiosResponse<{ id: number }>>;
  updateTodo: (input: Todo) => Promise<AxiosResponse<{ id: number }>>;
  deleteTodo: (input: Pick<Todo, "id">) => Promise<void>;
}
