import fastify, { FastifyInstance, FastifyPluginCallback, FastifyPluginAsync } from "fastify";
import fp from "fastify-plugin";
import routes from "@routes";
import mongoose from "mongoose";
import { TodoSchema } from "@schema/todo";

declare module "fastify" {
  interface FastifyRequest {}
  interface FastifyReply {}
}

const server: FastifyInstance = fastify({
  logger: false,
});

server.addContentTypeParser("application/json", { parseAs: "string" }, function (req, body, done) {
  try {
    let json = JSON.parse(body as string);
    done(null, json);
  } catch (error: any) {
    error.statusCode = 400;
    done(error as Error, undefined);
  }
});

mongoose.set("toJSON", {
  virtuals: true,
  transform: (_, converted) => {
    delete converted._id;
    delete converted.__v;
  },
});

const connectionDB = async () => {
  const dbURL = process.env.DB_URL;
  if (!dbURL) {
    throw new Error("No database URL");
  }
  try {
    const connection = await mongoose.connect(dbURL, {
      dbName: "hugo",
    });

    server.decorate("db", {
      Todos: connection.model("todos", TodoSchema),
    });
  } catch (error) {
    console.error(error);
  }
};

server.register(connectionDB);

server.register(routes);

server.listen({ port: 9082 }, async (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening on ${address}`);
});
