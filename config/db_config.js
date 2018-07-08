// Configuration file for the connection to the Postgres database
module.exports = {
  host: process.env.DB_HOST,
  dialect: 'postgres',
  operatorsAliases: false,
  logging: false
};
