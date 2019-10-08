const express = require('express')
const router = express.Router()
const authentication = require('../controllers/authentication')

// POST /login - Login The User
router.get('/login', authentication.login)

// POST /signup - Register New User
router.get('/signup', authentication.signup)

// POST /signup - Register New User
router.get('/isLoggedIn', authentication.isLoggedIn)

module.exports = router
