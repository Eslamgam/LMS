

const express = require('express')
const { login } = require('../../controllers/auth.controller.js/login')
const { loginValidator } = require('../../utils/validator/login.validator')


const router = express.Router()
router.route('/signin').post(loginValidator,login)

module.exports = router
