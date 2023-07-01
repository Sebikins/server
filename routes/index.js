
const Router = require('express')
const router = new Router()
const bookRouter = require('./bookRouter')
const userRouter = require('./userRouter')
const brandRouter = require('./brandRouter')
const typeRouter = require('./typeRouter')
const basketRouter = require('./basketRoutes')


router.use('/user', userRouter);
router.use('/type', typeRouter)
router.use('/brand', brandRouter)
router.use('/book', bookRouter)
router.use('/basket', basketRouter)


module.exports = router
