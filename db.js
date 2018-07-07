const Sequelize = require('sequelize');

const dbConfig = require('./config/db_config');

// Initialize connection
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  dbConfig
);

// Connect to the DB
sequelize
  .authenticate()
  .then(() => {
    console.log(`📚 Connection to database ${process.env.DB_NAME} at ${process.env.DB_HOST}:${process.env.DB_PORT} has been established successfully.`); // eslint-disable-line no-console
  })
  .catch((e) => {
    console.error('❌ Unable to connect to the database:', e); // eslint-disable-line no-console
  });

module.exports = sequelize;
