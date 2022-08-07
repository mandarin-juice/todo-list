export const createTodoSchema = {
  type: "object",
  required: ["text"],
  properties: {
    text: { type: "string" },
    completed: { type: "boolean" },
  },
};
