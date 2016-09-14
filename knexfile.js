module.exports = {
  development: {
    client: 'postgresql',
    connection: 'postgresql://localhost/knex_music',
    migrations: {
      directory: __dirname + '/src/server/db/migrations'
    },
  }
};
