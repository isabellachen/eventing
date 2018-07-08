'use strict';

require('dotenv').config();
const Koa = require('koa');
const cors = require('@koa/cors');
const logger = require('koa-logger')();
const bodyparser = require('koa-bodyparser');
require('./db');

// Require middlewares and router
const router = require('./router');
const errorHandler = require('./middlewares/errorHandler');
const errorNotFound = require('./middlewares/errorNotFound');

// Environment variables
const PORT = process.env.PORT || 3000;
const ENV = process.env.NODE_ENV || 'development';

const app = new Koa();

app
  .use(logger)
  .use(cors())
  .use(bodyparser())
  .use(router.routes())
  .use(router.allowedMethods());

// Errors handler
app.use(errorNotFound).use(errorHandler);

// Initialize server
app.listen(PORT, (err) => {
  err && console.error('❌ Unable to connect to the server:', err); // eslint-disable-line no-console
  console.log(`🌍 Running server on ${PORT} - ${ENV} mode!`); // eslint-disable-line no-console
});
