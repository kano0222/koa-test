const UserService = require('../../service/user')
const R = require('../../Response')
class UserController {
  async register (ctx, next) {
    if (ctx.request.body) {
      const { username, password } = ctx.request.body
      const svc = new UserService(ctx.db.test)
      ctx.body = R.ok(await svc.createUser(username, password))
      return
    }
    ctx.body = '注册失败'
  }
  async login (ctx, next) {
    ctx.body = '登录成功'
  }
}

module.exports = new UserController()
