import todos from "./todos";

const routes = (fastify: any, _: any, done: any) => {
  fastify.register(todos, { prefix: "/todos" });

  fastify.get("/ping", async () => {
    return "pong\n";
  });
  done();
};

export default routes;
