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

const app = new Koa();

app
  .use(logger)
  .use(cors())
  .use(bodyparser())
  .use(router.routes())
  .use(router.allowedMethods());

// Errors handler
app
  .use(errorNotFound)
  .use(errorHandler);

module.exports = app;
