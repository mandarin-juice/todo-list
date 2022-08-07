export const createTodoSchema = {
  type: "object",
  required: ["text"],
  properties: {
    text: { type: "string" },
    completed: { type: "boolean" },
  },
};

export const updateTodoSchema = {
  type: "object",
  required: ["id"],
  properties: {
    id: { type: "number" },
    text: { type: "string" },
    completed: { type: "boolean" },
  },
};

export const deleteTodoSchema = {
  type: "object",
  required: ["id"],
  properties: {
    id: { type: "number" },
  },
};
