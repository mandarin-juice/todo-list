import { FastifyPluginAsync } from "fastify";

const todoRoute: FastifyPluginAsync = async (fastify) => {
  fastify.get("/", async () => {
    return "todo items";
  });
};
export default todoRoute;
