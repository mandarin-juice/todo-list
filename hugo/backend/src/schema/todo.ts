import { Schema } from "mongoose";

interface Todo {
  _id: string;
  content: string;
  isDone: boolean;
}

export const TodoSchema = new Schema<Todo>({
  content: {
    type: String,
    required: true,
  },
  isDone: {
    type: Boolean,
    default: false,
  },
});
