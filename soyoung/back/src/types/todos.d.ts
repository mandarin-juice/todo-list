interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

type CreateTodoParams = Pick<Todo, "text" | "completed">;
