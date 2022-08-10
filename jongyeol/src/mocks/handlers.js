import { rest } from 'msw';

const todosInitData = [
  { id: 1, title: 'testTitle', content: 'testContent', createdAt: '2022-07-17' },
  { id: 2, title: 'testTitle2', content: 'testContent2', createdAt: '2022-07-18' },
  { id: 3, title: 'testTitle3', content: 'testContent3', createdAt: '2022-07-19' },
];

const TODOS = 'todos';

const getLocalStorage = (key) => {
  return JSON.parse(window.localStorage.getItem(key));
};

const setLocalStorage = (key, data) => {
  window.localStorage.setItem(key, JSON.stringify(data));
};

export const handlers = [
  rest.get('/init', (req, res, ctx) => {
    setLocalStorage(TODOS, todosInitData);
    return res(ctx.status(200));
  }),

  rest.post('/todo', async (req, res, ctx) => {
    let todos = await getLocalStorage(TODOS);
    let lastId;
    if (todos.length) {
      lastId = todos[todos.length - 1].id;
    } else {
      lastId = 0;
      todos = [];
    }
    const newTodo = await req.json();
    newTodo.id = lastId + 1;
    todos.push(newTodo);
    setLocalStorage(TODOS, todos);
    return res(ctx.status(200), ctx.json({ message: 'ok' }));
  }),

  rest.get('/todos', (req, res, ctx) => {
    const todos = getLocalStorage(TODOS);
    return res(
      ctx.status(200),
      ctx.json({
        todos,
      }),
    );
  }),

  rest.delete('/todo/:id', (req, res, ctx) => {
    const deleteTargetId = req.params.id;
    const todos = getLocalStorage(TODOS);
    const filteredTodos = todos.filter((todo) => todo.id != deleteTargetId);
    setLocalStorage(TODOS, filteredTodos);
    return res(
      ctx.status(200),
      ctx.json({
        message: 'ok',
      }),
    );
  }),
];
