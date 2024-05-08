



const express = require('express')
const { addQuiz, getQuiz } = require('../controllers/quiz.controller')
const verifyToken = require('../middelware/verifyToken')
const allowedTo = require('../middelware/allowedTo')
const userRoles = require('../utils/userRoles')
const { createQuizValidator, getQuizValidator } = require('../utils/validator/quiz.validator')

const router = express.Router()


router.route('/')
.post(verifyToken,allowedTo(userRoles.ADMIN),createQuizValidator,addQuiz)


router.route('/:quizId').get(verifyToken,getQuizValidator,getQuiz)



module.exports = router