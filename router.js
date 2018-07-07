const router = require('koa-router')();

const controller = require('./controllers/userRequest.controller');

router
  .post('/userRequest', controller.addUserRequest);

module.exports = router;
