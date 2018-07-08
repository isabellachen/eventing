const router = require('koa-router')();

const controller = require('./controllers/userRequest.controller');

router
  .post('/userRequest', controller.addUserRequest)
  .put('/userRequest', controller.updateRequestStatus);

module.exports = router;
