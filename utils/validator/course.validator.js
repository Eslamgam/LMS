const { check, validationResult } = require('express-validator')
const validatorMiddelware = require('../../middelware/validatorMiddelware')
const Course = require('../../models/course.model')
const appError = require('../appError')

const httpStatusText = require('../httpStatusText');
const { courseImagePath } = require('../../middelware/imagePath');



exports.getCourseValidator = [

    check('courseId')
        .notEmpty()
        .isUUID(4)
        .withMessage('invalid course id'),
    async (req, res, next) => {
        validatorMiddelware

        const course = await Course.findOne({
            where: { course_ID: req.params.courseId },
        });
        if (!course) {
            return next(appError.create('course not found', 404, httpStatusText.FAIL))

        }
        next()
    },


]


exports.createCourseValidator = [

    courseImagePath,
    check('course_name')
        .notEmpty()
        .withMessage('course_name is required') 
        .isLength({ min: 3, max: 250 }) 
        .withMessage('course_name must be between 3 and 32 characters'),

    check('course_hours')
        .notEmpty()
        .withMessage('course_hours is required') 
        .isNumeric() 
        .withMessage('course_hours must be a number')
        .isInt({ min: 1, max: 18 }) 
        .withMessage('course_hours must be between 1 and 18'),

    check('image_path')
        .notEmpty()
        .withMessage('image_path is required'),

];

exports.updateCourseValidator = [

    check('courseId')
        .notEmpty()
        .isUUID(4)
        .withMessage('invalid course id'),
    async (req, res, next) => {
        validatorMiddelware

        const course = await Course.findOne({
            where: { course_ID: req.params.courseId },
        });
        if (!course) {
            return next(appError.create('course not found', 404, httpStatusText.FAIL))

        }
        next()
    },
]
exports.deleteCourseValidator = [

    check('courseId')
        .notEmpty()
        .isUUID(4)
        .withMessage('invalid course id'),
    async (req, res, next) => {
        validatorMiddelware

        const course = await Course.findOne({
            where: { course_ID: req.params.courseId },
        });
        if (!course) {
            return next(appError.create('course not found', 404, httpStatusText.FAIL))

        }
        next()
    },


]


