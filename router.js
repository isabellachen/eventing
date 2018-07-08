const router = require('koa-router')();

const bot = require('./controllers/bot.controller');
const user = require('./controllers/user.controller');
const webhook = require('./controllers/webhook.controller');
const userRequest = require('./controllers/userRequest.controller');

// Endpoint for the bot webhook
router.post('/webhooks', webhook.startQuery);

// After form in FE has been filled
router.post('/eventFound', bot.eventFound);

// Endpoints user
router.post('/userRequest', userRequest.addUserRequest);
router.get('/event', user.getEventInfo);

module.exports = router;
