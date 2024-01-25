const Router = require('koa-router')

const { register, login } = require('../../controller/user')

const router = new Router({ prefix: '/user' })

router.post('/register', register)
router.post('/login', login)

module.exports = router