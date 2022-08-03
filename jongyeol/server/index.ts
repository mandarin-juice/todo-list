import fastify from 'fastify';
import cors from '@fastify/cors';

interface IQuerystring {
  username: string;
  password: string;
}

interface IHeaders {
  'h-Custom': string;
}

const server = fastify();

server.register(cors, {
  origin: true,
});
server.get('/ping', async (request, reply) => {
  reply.send({ hello: 'world' });
});

server.get<{
  Querystring: IQuerystring;
  Headers: IHeaders;
}>('/auth', async (request, reply) => {
  const { username, password } = request.query;
  const customerHeader = request.headers['h-Custom'];
  // do something with request data

  return 'logged in!';
});

server.listen({ port: 8080 }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});
