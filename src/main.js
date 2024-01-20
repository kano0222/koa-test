const { PORT } = require('./config/config.default')

const app = require('./app')

app.listen(PORT, () => {
  console.log(`server is running on ${PORT}!`)
})