const router = require('koa-router')();

const bot = require('./controllers/bot.controller')

const webhook = require('./controllers/webhook.controller')


const controller = require('./controllers/userRequest.controller');


//TO DELETE
router.get('/webhooks', (ctx) => {
  if (ctx.query['hub.verify_token'] === process.env.VERIFY_TOKEN) {
    ctx.body = ctx.query['hub.challenge']
    ctx.status = 200
  } else {
    ctx.body = 'invalid verify token'
    ctx.status = 401
  }
})

router.post('/webhooks', webhook.startQuery)

//After form in FE has been filled
router.post('/eventPending', bot.eventPending)
router.post('/eventFound', bot.eventFound)

router
  .post('/userRequest', controller.addUserRequest)
  .put('/userRequest', controller.updateRequestStatus);

router.get('/options', (ctx, next) => {
  let referer = ctx.headers.referer
  if (referer) {
    if (referer.indexOf('www.messenger.com') >= 0) {
      ctx.set('X-Frame-Options', 'ALLOW-FROM https://www.messenger.com/');
    } else if (referer.indexOf('www.facebook.com') >= 0) {
      ctx.set('X-Frame-Options', 'ALLOW-FROM https://www.facebook.com/');
    }
    // ctx.body = fetchFrontEnd()
  }
});

module.exports = router;
