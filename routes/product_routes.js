const express = require('express') //import express

const router = express.Router() //creates const for use function Router()

//creates const for use product controller
const controller = require('../controllers/product_controller')

router.get      ('/',       controller.list)
router.get      ('/:id',    controller.getById)
router.post     ('/',       controller.insert)
router.put      ('/:id',    controller.update)
router.delete   ('/:id',    controller.delete)

module.exports = router //export router for use in other .js