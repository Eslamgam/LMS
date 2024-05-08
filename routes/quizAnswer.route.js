



const express = require('express')
const { submit } = require('../controllers/quizAnswer.controller')
const verifyToken = require('../middelware/verifyToken')
const allowedTo = require('../middelware/allowedTo')
const userRoles = require('../utils/userRoles')
const { submitQuizValidator } = require('../utils/validator/quizAnswer.validator')

const router = express.Router()




router.post('/submit',verifyToken,allowedTo(userRoles.USER),submitQuizValidator,submit)



module.exports = router