
const Router = require('koa-router')

const myRouter = new Router()

myRouter.get('/test', (ctx, next) => {
  ctx.body = 'test'
})

myRouter.get('/test123', (ctx, next) => {
  ctx.body = 'test123'
})

module.exports = myRouter