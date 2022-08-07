import fastify from 'fastify';
import cors from '@fastify/cors';
import knex from './src/db';

type Todo = {
  title: string;
  content: string;
};

interface IQuerystring {
  username: string;
  password: string;
}

interface IHeaders {
  'h-Custom': string;
}

const server = fastify({
  logger: true,
});

server.register(cors, {
  origin: true,
});

server.get('/todos', async (request, reply) => {
  try {
    const result = await knex.select('*').from('todolist');
    reply.send(result);
  } catch (err) {
    reply.send({ message: `There was an error retrieving todolist: ${err}` });
  }
});

server.post<{ Body: Todo }>('/todo', async (request, reply) => {
  try {
    await knex('todolist').insert({
      title: request.body.title,
      content: request.body.content,
    });
    reply.send({ message: `todolist ${request.body.title}` });
  } catch (err) {
    reply.send({ message: `There was an error creating ${request.body.title} todolist: ${err}` });
  }
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
