const { check, validationResult } = require('express-validator')

const appError = require('../appError')

const httpStatusText = require('../httpStatusText');

const QuestionAnswer = require('../../models/questionAnswer.model')




exports.submitQuizValidator = [
    check('quiz_ID')
        .notEmpty().withMessage('quiz_ID is required') // Ensure quizId is provided
        .isUUID().withMessage('Invalid quiz_ID'),      // Validate UUID
    check('answers')
        .isArray()
        .withMessage('answers must be an array'), // Answers should be in an array
    check('answers.*.questionId')
        .isUUID()
        .withMessage('Invalid questionId'), // Each questionId should be a UUID
    check('answers.*.answerId')
        .isUUID()
        .withMessage('Invalid answerId'),    // Each answerId should be a UUID

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ status: httpStatusText.FAIL,message: errors.array(), });
        }

        next(); // Continue if validation passes
    },
];



