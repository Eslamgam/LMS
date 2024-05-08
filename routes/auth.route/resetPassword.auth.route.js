
const express = require('express')
const { resetPassword } = require('../../controllers/auth.controller.js/resetPassword')



const router = express.Router()
router.route('/resetPassword').post(resetPassword)

module.exports = router