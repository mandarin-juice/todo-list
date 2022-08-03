import { AppDataSource } from "../data-source";
import { Todo } from "../entities/Todo";

export async function createTodo(input: CreateTodoParams) {
  const { text, completed } = input;

  const todo = new Todo();
  todo.text = text;
  todo.completed = completed;

  await AppDataSource.manager.save(todo);
  console.log("todo has been saved. todo id is", todo.id);

  return todo.id;
}

export async function findTodos() {
  return await AppDataSource.manager.find(Todo);
}
