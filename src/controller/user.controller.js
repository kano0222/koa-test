const { createUser } = require('../service/user.service')
class UserController {
  async register (ctx, next) {
    console.log(ctx.request.body)
    console.log(ctx.body)
    if (ctx.request.body) {
      const { username, password } = ctx.request.body
      const res = await createUser(username, password)
      ctx.body = ctx.request.body
      return
    }
    ctx.body = '注册失败'
  }
  async login (ctx, next) {
    ctx.body = '登录成功'
  }
}

module.exports = new UserController()
