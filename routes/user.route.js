

const express = require('express')
const verifyToken = require('../middelware/verifyToken')
const allowedTo = require('../middelware/allowedTo')
const userRoles = require('../utils/userRoles')
const { getAllUsers } = require('../controllers/user.controller')

const router = express.Router()


router.get('/',verifyToken,allowedTo(userRoles.ADMIN),getAllUsers)





module.exports = router