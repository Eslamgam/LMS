const asyncWrapper = require("../middelware/asyncWrapper");

const appError = require("../utils/appError");

const httpStatusText = require('../utils/httpStatusText');
const { v4: uuid } = require('uuid')
const validatorMiddelware = require("../middelware/validatorMiddelware");

const Question = require("../models/question.model");
const QuestionAnswer = require("../models/questionAnswer.model");

exports. getAllQuestionAnswers = asyncWrapper(
    async (req, res, next) => {
        const question = await QuestionAnswer.findAll({
            where:{question_ID: req.params.questionId},
            // include: [{
            //     model: Quiz,
            //     attributes: ['quiz_title', 'quiz_notes']
            // }],
        }
        );
        if(question.length == 0){
            return next(appError.create('questionAnswers not found', 404, httpStatusText.FAIL))
        }
        return res.status(200).json({ status: httpStatusText.SUCCESS, data: { question } })
    }
)


exports. addQuestionAnswer = asyncWrapper(
    async (req, res, next) => {
        const { question_ID , text,  is_correct , answer_number } = req.body
        validatorMiddelware
        const questionAnswer = await QuestionAnswer.findOne({
            where: {question_ID, text }
        });
        if (questionAnswer) {
            return next(appError.create('questionAnswer already exist', 401, httpStatusText.FAIL))
        }

        const newQuestionAnswer = await QuestionAnswer.create({
            answer_ID  :uuid(),question_ID , text,  is_correct , answer_number 
        })

        return res.status(200).json({ status: httpStatusText.SUCCESS, data: { newQuestionAnswer } })
    }
)


exports. getQuestionAnswer = asyncWrapper(
    async (req, res, next) => {
        const id = req.params.questionAnswerId
        const questionAnswer = await QuestionAnswer.findOne({
            where: { answer_ID: id },
            include: [{
                model: Question,
                attributes: [ 'question_text']
            }],
        });
        if (!questionAnswer) {
            return next(appError.create('questionAnswer does not exist', 404, httpStatusText.FAIL))
        }

        return res.status(200).json({ status: httpStatusText.SUCCESS, data: { questionAnswer } })
    }
)



exports. updateQuestionAnswer = asyncWrapper(
    async (req, res, next) => {
        const { text,is_correct , answer_number } = req.body
        validatorMiddelware
        const id = req.params.questionAnswerId;
        const questionAnswer = await QuestionAnswer.findOne({
            where: { answer_ID: id }
        })
        if (!questionAnswer) {
            return next(appError.create('questionAnswer does not exist', 401, httpStatusText.FAIL))
        }

        const updatedQuestionAnswer = await QuestionAnswer.update(
            { is_correct: is_correct, answer_number: answer_number,text:text, updatedAt: Date }, { where: { answer_ID: id } }

        )
        if (updatedQuestionAnswer > 0) {
            return res.status(200).json({ status: httpStatusText.SUCCESS, message: `questionAnswer with ID ${id} updated successfully` })
        } else {
            return next(appError.create('questionAnswer does not exist', 401, httpStatusText.FAIL))
        }

    }
)


exports.deleteQuestionAnswer = asyncWrapper(
    async (req, res, next) => {
        const id = req.params.questionAnswerId;
        const questionAnswer = await QuestionAnswer.findOne({
            where: { question_ID: id }
        })
        if (!questionAnswer) {
            return next(appError.create('questionAnswer does not exist', 401, httpStatusText.FAIL))
        }

        const delete_QuestionAnswer = await QuestionAnswer.destroy(
           { where: { question_ID: id } }

        )
        if (delete_QuestionAnswer > 0) {
            return res.status(200).json({ status: httpStatusText.SUCCESS, message: `questionAnswer with ID ${id} updated successfully` })
        } else {
            return next(appError.create('questionAnswer does not exist', 401, httpStatusText.FAIL))
        }

    }
)




