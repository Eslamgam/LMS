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
const Quiz = require('../../models/quiz.model')


exports.getQuizValidator = [

    check('quizId')
        .notEmpty()
        .isUUID()
        .withMessage('invalid questionAnswer id'),
    async (req, res, next) => {
        validatorMiddelware

        const quiz = await Quiz.findOne({
            where: { quiz_ID: req.params.quizId },
        });
        if (!quiz) {
            return next(appError.create('quiz not found', 404, httpStatusText.FAIL))
        }
        next()
    },


]

exports.createQuizValidator = [

   
    check('quiz_title')
        .notEmpty()
        .withMessage('quiz_title is required'),

    check('quiz_notes')
        .notEmpty()
        .withMessage('quiz_notes is required'),


    check('start_date')
        .notEmpty()
        .withMessage('start_date is required')
        .isDate()
        .withMessage('start_date must be date'),
    check('end_date')
        .notEmpty()
        .withMessage('start_date is required')
        .isDate()
        .withMessage('start_date must be date'),

    check('quiz_grade')
        .notEmpty()
        .withMessage('quiz_grade is required')
        .isNumeric()
        .withMessage('quiz_grade must be number'),
    check('course_cycle_ID')
        .notEmpty()
        .withMessage('course_cycle_ID is required')
        .custom(async (course_cycle_ID) => {
            const courseSemester = await CourseSemester.findOne({
                where: {cycle_ID: course_cycle_ID },
            });
            if (!courseSemester) {
                return Promise.reject(appError.create('courseSemester with this ID not found', 404, httpStatusText.ERROR));
            }
        }),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return next(appError.create(errors.array(), 400, httpStatusText.FAIL));
        }
        next()
    },
    // check('instructor_ID')
    //     .notEmpty()
    //     .withMessage('instructor_ID is required')
    //     .custom(async (instructor_ID) => {
    //         const courseSemester = await User.findOne({
    //             where: { user_ID: instructor_ID },
    //         });
    //         if (!courseSemester) {
    //             return Promise.reject(appError.create('courseSemester with this ID not found', 404, httpStatusText.ERROR));
    //         }
    //     }),
    // (req, res, next) => {
    //     const errors = validationResult(req);
    //     if (!errors.isEmpty()) {
    //         return next(appError.create(errors.array(), 400, httpStatusText.FAIL));
    //     }
    //     next()
    // },

];




