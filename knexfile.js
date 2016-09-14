module.exports = {
  development: {
    client: 'postgresql',
    connection: 'postgresql://localhost/knex_music',
    migrations: {
      directory: __dirname + '/src/server/db/migrations'
    },
  },
  production: {
    client: 'postgresql',
    connection: process.env.DATABASE_URL,
    migrations: {
      directory: __dirname + '/src/server/db/migrations'
    },
  },
};
