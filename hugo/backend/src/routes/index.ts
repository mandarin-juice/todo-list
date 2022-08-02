import todos from "./todos";

const routes = (fastify) => {
  fastify.register(todos, { prefix: "/todos" });

  fastify.get("/ping", async () => {
    return "pong\n";
  });
};

export default routes;
