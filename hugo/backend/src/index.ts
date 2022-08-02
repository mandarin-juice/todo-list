import fastify from "fastify";
import routes from "@routes";
import mongoose from "mongoose";
import { TodoSchema } from "@schema/todo";

const server = fastify();

server.register(routes);

server.listen({ port: 9082 }, async (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }

  const dbURL = process.env.DB_URL;
  if (!dbURL) {
    console.error("No database URL");
    process.exit(1);
  }

  try {
    const connection = await mongoose.connect(dbURL, {
      dbName: "hugo",
    });

    server.decorate("db", {
      Todos: connection.model("todos", TodoSchema),
    });

    console.log(`Server listening at ${address}`);
  } catch (error: unknown) {
    console.error(error);
  }
});
