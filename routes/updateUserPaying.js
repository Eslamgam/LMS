
const express = require('express')
const verifyToken = require('../middelware/verifyToken')
const allowedTo = require('../middelware/allowedTo')
const userRoles = require('../utils/userRoles')
const { updateUserPaying } = require('../controllers/updateUserPaying')

const router = express.Router()


router.post('/',verifyToken,allowedTo(userRoles.ADMIN),updateUserPaying)





module.exports = router