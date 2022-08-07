interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

type CreateTodoParams = Pick<Todo, "text" | "completed">;
type UpdateTodoParams = Pick<Todo, "id" | "text" | "completed">;
type DeleteTodoParams = Pick<Todo, "id">;
