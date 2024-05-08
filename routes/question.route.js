



const express = require('express')
const { getAllQuestion, addQuestion, getQuestion, updateQuestion, deleteQuestion } = require('../controllers/question.controller')
const verifyToken = require('../middelware/verifyToken')
const allowedTo = require('../middelware/allowedTo')
const userRoles = require('../utils/userRoles')
const { createQuestionValidator, getQuestionValidator, updateQuestionValidator, deleteQuestionValidator } = require('../utils/validator/question.validator')

const router = express.Router()


router.route('/')
.post(verifyToken,allowedTo(userRoles.ADMIN),createQuestionValidator,addQuestion)



router.get('/:quizId/questions/',verifyToken,getAllQuestion)


router.route('/:questionId')
.get(verifyToken,getQuestionValidator,getQuestion)
.patch(verifyToken,allowedTo(userRoles.ADMIN),updateQuestionValidator,updateQuestion)
.delete(verifyToken,allowedTo(userRoles.ADMIN),deleteQuestionValidator,deleteQuestion)



module.exports = router