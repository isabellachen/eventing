const router = require('koa-router')();

const bot = require('./controllers/bot.controller');
const event = require('./controllers/event.controller');
const webhook = require('./controllers/webhook.controller');
const userRequest = require('./controllers/userRequest.controller');

// Endpoint for the bot webhook
router.post('/webhooks', webhook.startQuery);

// After form in FE has been filled
router.post('/eventFound', bot.eventFound);

// Endpoints user
router
  .get('/event', event.getEventInfo)
  .post('/userRequest', userRequest.addUserRequest);

module.exports = router;
