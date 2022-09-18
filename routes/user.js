const express = require('express')
const { verify } = require('../Middlewares/auth-middleware')
const router = express.Router()
const { doUserSignup , doUserLogin } = require('../services/auth')

router.post('/signup', doUserSignup)
router.post('/login' , doUserLogin)


module.exports = router