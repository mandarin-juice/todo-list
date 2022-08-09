import fastify from 'fastify';
import cors from '@fastify/cors';
import knex from './src/db';

type TodoBody = {
  title: string;
  content: string;
};

type PatchBody = {
  id: number;
  completed: boolean;
};

type DeleteParam = {
  id: number;
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

server.post<{ Body: TodoBody }>('/todo', async (request, reply) => {
  const { title, content }: TodoBody = request.body;
  try {
    await knex('todolist').insert({
      title,
      content,
    });
    reply.code(200).send({ message: `todolist ${title}` });
  } catch (err) {
    reply.send({ message: `There was an error creating ${title} todolist: ${err}` });
  }
});

server.delete<{ Params: DeleteParam }>('/todo/:id', async (request, reply) => {
  const id = request.params.id;
  try {
    await knex('todolist').where('id', id).del();
    reply.code(200).send({ message: `todolist ${id} deleted` });
  } catch (err) {
    reply.send({ message: `There was an error deleting ${id} todolist: ${err}` });
  }
});

server.patch<{ Body: PatchBody }>('/todo/complete', async (request, reply) => {
  const { id, completed }: PatchBody = request.body;
  console.log(id, completed);
  try {
    const result = await knex('todolist')
      .where('id', id)
      .update({ completed })
      .update('updatedAt', knex.fn.now());
    if (result === 1) {
      reply.send({ message: 'todo complete toggle' });
    }
  } catch (err) {
    reply.send({ message: `There was an error patching ${id} todolist: ${err}` });
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
