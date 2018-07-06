const router = require('koa-router')();
const { graphqlKoa } = require('apollo-server-koa');
const webhook = require('./webhook')
require('dotenv').config()


// Require schema from graphql

// Pass the schema as argument
// router.get('/graphql', graphqlKoa({ schema }));

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

module.exports = router