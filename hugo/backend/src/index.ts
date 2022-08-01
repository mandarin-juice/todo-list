import fastify from "fastify";
import mongoose from "mongoose";
import { TodoSchema } from "@schema/todo";

const server = fastify();

server.get("/ping", async (request, reply) => {
  return "pong\n";
});

server.get("/todos", async (request, reply) => {
  const todos = mongoose.model("todos", TodoSchema).find();
  console.log(todos);
  return todos;
});

server.post("/todos", async (request, reply) => {
  return "pong\n";
});

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
    await mongoose.connect(dbURL, {
      dbName: "hugo",
    });
    console.log(`Server listening at ${address}`);
  } catch (error: unknown) {
    console.error(error);
  }
});
