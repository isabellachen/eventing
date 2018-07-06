var fs = require('fs')
const Koa = require('koa')
const bodyParser = require('koa-bodyparser')

const app = new Koa()
const router = require('./router') 

app
  .use(bodyParser())
  .use(router.routes())
  .use(router.allowedMethods())

app.listen(3000, () => {
  console.log('koa app listening on port 3000')
})