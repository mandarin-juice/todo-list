import fastify from "fastify";
import routes from "@routes";
import mongoose from "mongoose";
import { TodoSchema } from "@schema/todo";

const server = fastify({
  logger: false,
});

server.addContentTypeParser("application/json", { parseAs: "string" }, function (req, body, done) {
  try {
    let json = JSON.parse(body as string);
    done(null, json);
  } catch (error: unknown) {
    done(error as Error, undefined);
  }
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
