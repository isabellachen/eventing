const Router = require('koa-router')
const fetch = require('cross-fetch')
const request = require('request')
require('dotenv').config()

const router = new Router()
const controller = require('./controller')

// router.get('/webhooks', (ctx) => {
//   if (ctx.query['hub.verify_token'] === process.env.VERIFY_TOKEN) {
//     ctx.body = ctx.query['hub.challenge']
//     ctx.status = 200
//   } else {
//     ctx.body = 'invalid verify token'
//     ctx.status = 401
//   }
// })

router.post('/webhooks', controller.startQuery)

module.exports = router