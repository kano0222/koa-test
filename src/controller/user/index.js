const UserService = require('../../service/user')
const R = require('../../Response')
class UserController {
  async register (ctx, next) {
    const { username, password } = ctx.request.body
    if (username && password) {
      const svc = new UserService(ctx.db.test)
      try {
        await svc.createUser(username, password)
        ctx.body = R.ok(null, '用户注册成功')
      } catch (error) {
        if (error.code === 11000) {
          ctx.body = R.ok(null, '该用户名已被注册')
        } else {
          throw error
        }
      }
    } else {
      ctx.body = R.ok(null, '用户名或密码为空')
    }
  }
  async login (ctx, next) {
    ctx.body = '登录成功'
  }
}

module.exports = new UserController()
