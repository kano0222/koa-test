const Koa = require('koa')
const { koaBody } = require('koa-body')
const { errorCapture } = require("../middlewares/errorCapture")
const { addMongoDB } = require('../db')
const userRouter = require('../router/user')

async function createServer () {
  const app = new Koa()
  app.use(errorCapture())
  app.use(koaBody())
  await addMongoDB(app)
  app.use(userRouter.routes())
  return app
}

exports.createServer = createServer
