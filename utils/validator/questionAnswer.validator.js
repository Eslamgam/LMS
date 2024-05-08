const { check, validationResult } = require('express-validator')
const validatorMiddelware = require('../../middelware/validatorMiddelware')
const Course = require('../../models/course.model')
const Faculty = require('../../models/faculty.model')
const appError = require('../appError')

const httpStatusText = require('../httpStatusText');
const Lecture = require('../../models/lecture.model')
const CourseSemester = require('../../models/courseSemester.model')
const LectureFile = require('../../models/lectureFile.model')
const New = require('../../models/new.model')
const User = require('../../models/user.model')
const QuestionAnswer = require('../../models/questionAnswer.model')
const Question = require('../../models/question.model')


exports.getQuestionAnswerValidator = [

    check('questionAnswerId')
        .notEmpty()
        .isUUID()
        .withMessage('invalid questionAnswer id'),
    async (req, res, next) => {
        validatorMiddelware

        const questionAnswer = await QuestionAnswer.findOne({
            where: { answer_ID: req.params.questionAnswerId },
        });
        if (!questionAnswer) {
            return next(appError.create('questionAnswer not found', 404, httpStatusText.FAIL))
        }
        next()
    },


]

exports.createQuestionAnswerValidator = [

   
    check('text')
        .notEmpty()
        .withMessage('lecture_file_ID is required'),

    check('is_correct')
        .notEmpty()
        .withMessage('is_correct is required')
        .isBoolean()
        .withMessage('is_correct is required'),

    check('answer_number')
        .notEmpty()
        .withMessage('answer_number is required')
        .isNumeric()
        .withMessage('answer_number is required'),


    check('question_ID')
        .notEmpty()
        .withMessage('question_ID is required')
        .custom(async (question_ID) => {
            const question = await Question.findOne({
                where: { question_ID },
            });
            if (!question) {
                return Promise.reject(appError.create('question with this ID not found', 404, httpStatusText.ERROR));
            }
        }),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return next(appError.create(errors.array(), 400, httpStatusText.FAIL));
        }
        next()
    },

];

exports.updateQuestionAnswerValidator = [

    check('questionAnswerId')
        .notEmpty()
        .isUUID()
        .withMessage('invalid questionAnswer id'),
    async (req, res, next) => {
        validatorMiddelware

        const questionAnswer = await QuestionAnswer.findOne({
            where: { answer_ID: req.params.questionAnswerId },
        });
        if (!questionAnswer) {
            return next(appError.create('questionAnswer not found', 404, httpStatusText.FAIL))
        }
        next()
    },


]



