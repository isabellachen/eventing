const Koa = require('koa');
const logger = require('koa-logger')();
const cors = require('@koa/cors');
const bodyParser = require('koa-bodyparser');
const cookie = require('koa-cookie').default
const serve = require('koa-static')
require('dotenv').config();

const errorHandler = require('./middlewares/errorHandler');
const errorNotFound = require('./middlewares/errorNotFound');
const router = require('./router');

const PORT = process.env.PORT || 3000;

const app = new Koa();
console.log(cookie)
app
  .use(serve('./index'))
  .use(logger)
  .use(cors())
  .use(bodyParser())
  .use(cookie())
  .use(router.routes())
  .use(router.allowedMethods());

// Errors handler
app
  .use(errorNotFound)
  .use(errorHandler);

// Initialize server
app.listen(PORT, (err) => {
  err && console.error(err); // eslint-disable-line no-console
  console.log(`🌍 Running server on ${PORT}`); // eslint-disable-line no-console
});
