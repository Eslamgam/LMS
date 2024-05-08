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
const Quiz = require('../../models/quiz.model')
const Question = require('../../models/question.model')


exports.getQuestionValidator = [

    check('questionId')
        .notEmpty()
        .isUUID()
        .withMessage('question new id'),
    async (req, res, next) => {
        validatorMiddelware

        const question = await Question.findOne({
            where: { question_ID: req.params.questionId },
        });
        if (!question) {
            return next(appError.create('question not found', 404, httpStatusText.FAIL))
        }
        next()
    },


]

exports.createQuestionValidator = [
    check('question_text')
        .notEmpty()
        .withMessage('question_text is required'),

    check('question_type')
        .notEmpty()
        .withMessage('question_type is required'),

    check('question_number')
        .notEmpty()
        .withMessage('question_number is required')
        .isNumeric()
        .withMessage('question_number must be number'),

    check('question_grade')
        .notEmpty()
        .withMessage('question_grade is required')
        .isNumeric()
        .withMessage('question_grade must be number'),

    check('quiz_ID')
        .notEmpty()
        .withMessage('user_ID is required')
        .custom(async (quiz_ID) => {
            const quiz = await Quiz.findOne({
                where: { quiz_ID },
            });
            if (!quiz) {
                return Promise.reject(appError.create('quiz with this ID not found', 404, httpStatusText.ERROR));
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

exports.updateQuestionValidator = [

    check('questionId')
        .notEmpty()
        .isUUID()
        .withMessage('question new id'),
    async (req, res, next) => {
        validatorMiddelware

        const question = await Question.findOne({
            where: { question_ID: req.params.questionId },
        });
        if (!question) {
            return next(appError.create('question not found', 404, httpStatusText.FAIL))
        }
        next()
    },


]
exports.deleteQuestionValidator = [

    check('questionId')
        .notEmpty()
        .isUUID()
        .withMessage('question new id'),
    async (req, res, next) => {
        validatorMiddelware

        const question = await Question.findOne({
            where: { question_ID: req.params.questionId },
        });
        if (!question) {
            return next(appError.create('question not found', 404, httpStatusText.FAIL))
        }
        next()
    },


]

