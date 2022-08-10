// Import path module
// eslint-disable-next-line @typescript-eslint/no-var-requires
import path from 'path';
import Knex from 'knex';

const dbPath = path.resolve(__dirname, 'db/database.sqlite');

const knex = Knex({
  client: 'sqlite3',
  connection: {
    filename: dbPath,
  },
  useNullAsDefault: true,
});

knex.schema
  .hasTable('todolist')
  .then((exists) => {
    if (!exists) {
      return knex.schema
        .createTable('todolist', (table) => {
          table.increments('id').primary();
          table.string('title');
          table.string('content');
          table.integer('completed').defaultTo(0);
          table.timestamp('updatedAt', { useTz: true });
          table.timestamp('createdAt').defaultTo(knex.fn.now());
        })
        .then(() => {
          // Log success message
          console.log('Table todolist created');
        })
        .catch((error) => {
          console.error(`There was an error creating table: ${error}`);
        });
    }
  })
  .then(() => {
    // Log success message
    console.log('done');
  })
  .catch((error) => {
    console.error(`There was an error setting up the database: ${error}`);
  });

// Just for debugging purposes:
// Log all data in "todolist" table
knex
  .select('*')
  .from('todolist')
  .then((data) => console.log('data:', data))
  .catch((err) => console.log(err));

// Export the database

export default knex;
