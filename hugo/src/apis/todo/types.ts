export type Todo = {
  id: number;
  content: string;
};

export interface TodoApiInterface {
  getTodos: () => Array<Todo>;
}
