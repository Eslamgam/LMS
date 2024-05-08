
const express = require('express')
const { verfiyStatusCode } = require('../../controllers/auth.controller.js/verfiyCode')



const router = express.Router()
router.route('/verfiyCode').post(verfiyStatusCode)

module.exports = router