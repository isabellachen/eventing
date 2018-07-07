require('dotenv').config();
const Koa = require('koa');
const cors = require('@koa/cors');
const logger = require('koa-logger')();
const bodyparser = require('koa-bodyparser');

const router = require('./router');
const errorHandler = require('./middlewares/errorHandler');
const errorNotFound = require('./middlewares/errorNotFound');

const PORT = process.env.PORT || 3000;

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
app.listen(PORT, err => {
  err && console.error(err); // eslint-disable-line no-console
  console.log(`🌍 Running server on ${PORT}`); // eslint-disable-line no-console
});
