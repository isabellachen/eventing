const Koa = require('koa');
const logger = require('koa-logger')();
const cors = require('@koa/cors');
require('dotenv').config();

const PORT = process.env.PORT || 3000;

const app = new Koa();

app
  .use(logger)
  .use(cors());

app
  .listen(PORT, err => {
    err && console.error(err);
    console.log(`🌍 Running server on ${PORT}`);
  });


