const UserService = require('../../service/user')
const R = require('../../Response')
class UserController {
  async register (ctx, next) {
    const { username, password } = ctx.request.body
    if (!username || !password) {
      ctx.body = R.ok(null, '用户名或密码为空')
      return
    }
    try {
      const svc = new UserService(ctx.db.test)
      await svc.createUser(username, password)
      ctx.body = R.ok(null, '用户注册成功')
    } catch (error) {
      if (error.code === 11000) {
        ctx.body = R.ok(null, '该用户名已被注册')
      } else {
        ctx.body = R.ok(null, '注册失败，请重试')
      }
    }
  }
  async login (ctx, next) {
    const { username, password } = ctx.request.body
    if (!username || !password) {
      ctx.body = R.ok(null, '用户名或密码为空')
      return
    }
    const svc = new UserService(ctx.db.test)
    const user = await svc.findOneByUsername(username)
    if (user && user.password === password) {
      ctx.body = R.ok(null, '登录成功')
    } else {
      ctx.body = R.ok(null, '用户名或密码错误')
    }
  }
  async updateUser (ctx, next) {
    try {
      const svc = new UserService(ctx.db.test)
      const user = await svc.updateUser(ctx.request.body)
      const message = user ? '用户信息修改成功' : '用户不存在'
      ctx.body = R.ok(user, message)
    } catch (error) {
      ctx.body = R.ok(null, '用户信息修改失败')
    }
  }

  async deleteUser (ctx, next) {
    const { username } = ctx.request.body
    try {
      const svc = new UserService(ctx.db.test)
      ctx.body = R.ok(await svc.deleteUserByUsername(username), '用户删除成功')
    } catch (error) {
      ctx.body = R.ok(null, '用户删除失败')
    }
  }

  async findOne (ctx, next) {
    const { username } = ctx.request.params
    try {
      const svc = new UserService(ctx.db.test)
      const res = await svc.findOneByUsername(username)
      ctx.body = R.ok(res)
    } catch (error) {
      ctx.body = R.ok(null, '查询失败')
    }
  }

  async findAll (ctx, next) {
    try {
      const svc = new UserService(ctx.db.test)
      ctx.body = R.ok(await svc.findAll())
    } catch (error) {
      ctx.body = R.ok(null, '查询失败')
    }
  }
}

module.exports = new UserController()
