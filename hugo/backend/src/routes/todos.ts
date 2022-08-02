const todos = (fastify) => {
  fastify.get("/", async (request, reply) => {
    const todos = fastify.db.Todos.find();
    return todos;
  });

  fastify.post("/", async (request, reply) => {
    return "make todo";
  });
};

export default todos;
