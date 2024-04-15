const express = require('express')
const router = express.Router()
const usersController = require('../controllers/users')

// Route for user signup
router.post('/signup', usersController.signup);

// Route for user login
router.post('/login', usersController.login);

const userRouter = router;
module.exports = userRouter