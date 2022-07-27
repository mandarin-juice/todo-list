import fastify from "fastify";

import leveldb from "@fastify/leveldb";

interface IQuerystring {
  key: string;
}

interface TodoBody {
  key: string;
  value: string;
}

const server = fastify();

server.register(leveldb, { name: "db", path: "./local" });

server.get<{
  Querystring: IQuerystring;
}>("/foo", async function (req, reply) {
  //   console.log("req", req);
  const val = await this.level.db.get(req.query.key);
  console.log("val", val);
  return val;
});

server.post<{
  Body: TodoBody;
}>("/foo", async function (req, reply) {
  await this.level.db.put(req.body.key, req.body.value);
  return { status: "ok" };
});

server.listen({ port: 8080 }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});
