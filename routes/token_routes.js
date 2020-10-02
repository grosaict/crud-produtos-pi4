const express = require('express') //import express

const router = express.Router() //creates const for use function Router()

//creates const for use user controller
const controller = require('../controllers/token_controller')

router.post     ('/',       controller.tokenGenerator);
router.post     ('/user',   controller.insertUser)

module.exports = router //export router for use in other .js