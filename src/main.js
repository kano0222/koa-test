const Koa = require('koa')
const { PORT } = require('./config/config.default')

const app = new Koa()

app.use((ctx, next) => {
  ctx.body = 'body'
})

app.listen(PORT, () => {
  console.log('server is running!')
})