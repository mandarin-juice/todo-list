import knex from '../db';

export const todolistAll = async (req, res) => {
  knex
    .select('*')
    .from('todolist')
    .orderBy('id', 'desc')
    .then((userData) => {
      res.json(userData);
    })
    .catch((err) => {
      res.json({ message: `There was an error retrieving todolist: ${err}` });
    });
};
