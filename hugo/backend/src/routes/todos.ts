import type { FastifyPluginCallback } from "fastify";

const todos: FastifyPluginCallback = (fastify, _, done) => {
  fastify.get("/", (_, reply) => {
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
    fastify.db.Todos.create(
      {
        content,
      },
      (error: unknown, result: any) => {
        if (error) {
          reply.code(400).send({ error });
          return;
        }
        reply.code(200).send({
          id: result.id,
        });
      },
    );
  });

  fastify.delete("/", (request: any, reply: any) => {
    const { id } = request.body;
    fastify.db.Todos.deleteOne(
      {
        id,
      },
      (error: any) => {
        if (error) {
          reply.code(404).send({ error });
          return;
        }
        reply.code(200).send();
      },
    );
  });

  fastify.put("/", (request: any, reply: any) => {
    const { id, content, isDone } = request.body;
    fastify.db.Todos.updateOne(
      {
        id,
      },
      {
        content,
        isDone,
      },
      (error: unknown) => {
        if (error) {
          console.error(error);
          reply.code(400).send({ error });
          return;
        }
        reply.code(200).send();
      },
    );
  });

  done();
};

export default todos;
