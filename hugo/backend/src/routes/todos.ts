const todos = (fastify: any, _: any, done: any) => {
  fastify.get("/", (request: any, reply: any) => {
    fastify.db.Todos.find({}, (error: any, result: any) => {
      if (error) {
        reply.code(400).send(null);
        return;
      }

      reply.code(200).send(result);
    });
  });

  fastify.post("/", (request: any, reply: any) => {
    const { content } = request.body;
    const todosModel = fastify.db.Todos;
    const result = todosModel.create(
      {
        content,
      },
      (error: unknown) => {
        console.error(error);
        reply.code(400).send(null);
        return;
      },
    );

    reply.code(200).send(result);
  });

  done();
};

export default todos;
