require('dotenv').config();
const Koa = require('koa');
const cors = require('@koa/cors');
const serve = require('koa-static')
const logger = require('koa-logger')();
const bodyparser = require('koa-bodyparser');
const eventController = require('./controllers/event.controller.js')
require('./db');

const router = require('./router');
const errorHandler = require('./middlewares/errorHandler');
const errorNotFound = require('./middlewares/errorNotFound');

async function populateDatabase() {

  const eventController = require('./controllers/event.controller');
  const categoryController = require('./controllers/category.controller');
  const userController = require('./controllers/user.controller');
  const userRequestController = require('./controllers/userRequest.controller');

  await categoryController.addCategory({name: 'Volleyball', userLimit: 4});
  await categoryController.addCategory({name: 'Football', userLimit: 16});
  await categoryController.addCategory({name: 'Night out', userLimit: 10});
  await categoryController.addCategory({name: 'Chess', userLimit: 2});

  const event = await eventController.addEvent({
    categoryId: 1,
    status: 'active'
  });

  await eventController.addEvent({
    categoryId: 2,
    status: 'active'
  });
  await eventController.addEvent({
    categoryId: 3,
    status: 'active'
  });

  await userController.addUser({
    id: 2082147955157984,
    first_name: 'Marlon',
    last_name: 'Becker',
  });

  await userController.addUser({
    id: 1766956916726715,
    first_name: 'Marco',
    last_name: 'Ghiani',
  });

  await userController.addUser({
    id: 1921533581204223,
    first_name: 'Isabella',
    last_name: 'Chen',
  });

  // await userController.addUser({
  //   id: 19215335812041233,
  //   first_name: 'Leonardo',
  //   last_name: 'Di Vittorio',
  // });
  // console.log(await eventController.getEvent(50));
}

// populateDatabase();


// Environment variables
const PORT = process.env.PORT || 3000;
const ENV = process.env.NODE_ENV || 'development';

const c = require('./controllers/user.controller');

c.addUser({
  id: 1234567890,
  first_name: 'gbfjhsb',
  last_name: 'gbfjhsb'
});




const app = new Koa();

app
  .use(serve('./index'))
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
