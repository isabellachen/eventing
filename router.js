const router = require('koa-router')();
const { graphqlKoa } = require('apollo-server-koa');

const webhook = require('./webhook')

const expressPlayground = require('graphql-playground-middleware-koa').default;

// Require schema from graphql
const schema = require('./graphql');

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

//Pass the schema as an argument
router.post('/graphql', graphqlKoa({ schema }));

router.get(
  '/explore',
  expressPlayground({
    endpoint: '/graphql'
  })
);

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
