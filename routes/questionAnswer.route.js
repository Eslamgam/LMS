



const express = require('express')
const { addQuestionAnswer, getQuestionAnswer, updateQuestionAnswer, getAllQuestionAnswers, deleteQuestionAnswer } = require('../controllers/questionAnswer.controller')
const verifyToken = require('../middelware/verifyToken')
const allowedTo = require('../middelware/allowedTo')
const userRoles = require('../utils/userRoles')
const { createQuestionAnswerValidator, getQuestionAnswerValidator, updateQuestionAnswerValidator } = require('../utils/validator/questionAnswer.validator')

const router = express.Router()


router.route('/').post(verifyToken,allowedTo(userRoles.ADMIN),createQuestionAnswerValidator,addQuestionAnswer)
router.get('/:questionId/questionanswers',verifyToken, getAllQuestionAnswers)

router.patch('/:questionAnswerId',verifyToken,allowedTo(userRoles.ADMIN),updateQuestionAnswerValidator,updateQuestionAnswer)

router.route('/:questionAnswerId').delete(verifyToken, allowedTo(userRoles.ADMIN), deleteQuestionAnswer)

module.exports = router