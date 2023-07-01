const Router = require('express')
const router = new Router()
const bookController = require('../controllers/bookController')
const checkRole = require("../middleware/checkRoleMiddleware");

router.post('/',checkRole('ADMIN'), bookController.create)
router.post('/update',checkRole('ADMIN'), bookController.setDescription)
router.get('/', bookController.getAll)
router.get('/:id', bookController.getOne)
router.post('/update/:id',checkRole('ADMIN'), bookController.updated)
router.post('/del/:id',checkRole('ADMIN'), bookController.delOne)

module.exports = router