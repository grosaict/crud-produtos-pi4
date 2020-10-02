const express = require('express') //import express

const router = express.Router() //creates const for use function Router()

//creates const for use product controller
const controller = require('../controllers/cart_controller')

router.get      ('/', controller.list)
router.post     ('/', controller.insert)
router.put      ('/', controller.update)
router.delete   ('/', controller.delete)

module.exports = router //export router for use in other .js