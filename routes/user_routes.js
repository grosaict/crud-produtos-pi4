const express = require('express') //import express

const router = express.Router() //creates const for use function Router()

//creates const for use user controller
const controller = require('../controllers/user_controller')

router.get      ('/',       controller.list)
router.get      ('/search', controller.getByUserName);
router.get      ('/:id',    controller.getById)
router.put      ('/:id',    controller.update)
router.delete   ('/:id',    controller.delete)

module.exports = router //export router for use in other .js