import { Todo } from "./entities/Todo";
import { AppDataSource } from "./data-source";

const todo = new Todo();
todo.text = "do something";
todo.completed = false;

AppDataSource.manager
  .save(todo)
  .then(() => console.log("todo has been saved. todo id is", todo.id));
