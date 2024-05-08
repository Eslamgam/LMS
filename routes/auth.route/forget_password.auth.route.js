
const express = require('express')
const { forgetPassword } = require('../../controllers/auth.controller.js/forget_password')
const router = express.Router()




router.route('/forgetPassword').post(forgetPassword)

module.exports = router