const Router = require('koa-router')

const UserController = require('../../controller/user')

const router = new Router({ prefix: '/user' })

router.post('/register', UserController.register)
router.post('/login', UserController.login)
router.post('/deleteUser', UserController.deleteUser)
router.post('/updateUser', UserController.updateUser)
router.get('/find', UserController.findAll)
router.get('/find/:username', UserController.findOne)

module.exports = router