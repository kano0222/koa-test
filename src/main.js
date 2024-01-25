const { PORT } = require('./config/config.default')
const { addMongoDB } = require('./db')

const cluster_1 = require("cluster")
async function run () {
  console.info(`Node版本：`, process.versions.node)
  console.info(`NODE_ENV：`, process.env.NODE_ENV)
  console.info(`创建开发主进程`)
  cluster_1.on("listening", (worker, address) => {
    console.log(`工作进程 ${worker.process.pid} 监听于 ${address.address}:${address.port}`)
  })
  cluster_1.on("exit", (worker, code, signal) => {
    console.warn(`工作进程 ${worker.process.pid} 已退出，返回值 ${code} (${signal})`)
    if (!code) {
      cluster_1.default.fork()
    }
  })
  const app = require('./app')
  await addMongoDB(app)
  app.listen(PORT, () => {
    console.log(`server is running on ${PORT}!`)
  })
}
run()
// db.createUser({ user: "kano0222", pwd: "kano224", roles: [{ role: 'root', db: "admin" }] })