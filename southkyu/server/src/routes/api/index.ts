import { FastifyPluginAsync } from "fastify";
import todoRoute from "./todo";

const api: FastifyPluginAsync = async (fastify) => {
  fastify.register(todoRoute, { prefix: "/todo" });
};

export default api;
