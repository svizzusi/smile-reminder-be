const express = require('express')
const router = express.Router()
const usersController = require('../controllers/users')

router.post('/signup', usersController.signup)

const userRouter = router;
module.exports = userRouter