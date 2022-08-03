import fastify from "fastify";
import "./data-source";
import routes from "./modules/todo";

const server = fastify();

server.get("/ping", async (request, reply) => {
  return "pong\n";
});

server.listen({ port: 8080 }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});

server.register(routes);
