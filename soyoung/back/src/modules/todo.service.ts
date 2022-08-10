import { AppDataSource } from "../data-source";
import { Todo } from "../entities/Todo";

export async function createTodo(params: CreateTodoParams) {
  const { text, completed } = params;

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

export async function updateTodo(params: UpdateTodoParams) {
  const { id, text, completed } = params;

  const todo = await AppDataSource.manager.findOneBy(Todo, { id });
  if (!todo) return;

  todo.text = text;
  todo.completed = completed;
  await AppDataSource.manager.save(todo);
  console.log("todo has been updated. todo id is", todo.id);
  return todo.id;
}

export async function deleteTodo(params: DeleteTodoParams) {
  const { id } = params;

  const todo = await AppDataSource.manager.findOneBy(Todo, { id });
  if (!todo) return;

  await AppDataSource.manager.remove(todo);
  console.log("todo has been deleted. todo id is", id);
}
