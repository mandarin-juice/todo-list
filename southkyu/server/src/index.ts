import Fastify from "fastify";
import routes from "./routes";

const server = Fastify({});

server.register(routes);

server.listen({ port: 4000 }, (_, address) => {
  server.log.info(`server listenin on ${address}`);
});
