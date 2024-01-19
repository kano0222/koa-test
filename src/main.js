const Koa = require('koa')
const { PORT } = require('./config/config.default')

const app = new Koa()

const myRouter = require('./router')
app.use(myRouter.routes())

app.listen(PORT, () => {
  console.log(`server is running on ${PORT}!`)
})