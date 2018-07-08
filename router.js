const router = require('koa-router')();

const userRequest = require('./controllers/userRequest.controller');
const user = require('./controllers/user.controller');

// User request endpoints to add a user request and update it
router
  .post('/userRequest', userRequest.addUserRequest);

// Endpoint to get all the users in an event
router
  .get('/event', user.getEventInfo);

module.exports = router;
