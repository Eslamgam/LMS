
const { check, validationResult } = require('express-validator')
const validatorMiddelware = require('../../middelware/validatorMiddelware')
const Course = require('../../models/course.model')
const appError = require('../appError')

const httpStatusText = require('../httpStatusText');
const CourseSemester = require('../../models/courseSemester.model')
const Semester = require('../../models/semester.model')


exports.getCourseSemesterValidator = [

    check('courseSemesterId')
        .notEmpty()
        .isUUID()
        .withMessage('invalid courseSemester id'),
    async (req, res, next) => {
        validatorMiddelware

        const course = await CourseSemester.findOne({
            where: { cycle_ID: req.params.courseSemesterId },
        });
        if (!course) {
            return next(appError.create('CourseSemesters not found', 404, httpStatusText.FAIL))

        }
        next()
    },


]

exports.createCourseSemesterValidator = [

    check('semester_ID')
        .notEmpty()
        .withMessage('course_name is required')
        .custom(async (semester_ID) => {
            const semester = await Semester.findOne({
                where: { semester_ID },
            });


            if (!semester) {
                return Promise.reject(appError.create('semester with this ID not found', 404, httpStatusText.ERROR));
            }
        }),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return next(appError.create(errors.array(), 400, httpStatusText.FAIL));
        }
        next()
    },
    check('course_ID')
        .notEmpty()
        .withMessage('course_ID is required')
        .custom(async (course_ID) => {
            const course = await Course.findOne({
                where: { course_ID },
            });

            if (!course) {
                return Promise.reject(appError.create('course with this ID not found', 404, httpStatusText.ERROR));
            }
        }),


    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return next(appError.create(errors.array(), 400, httpStatusText.FAIL));
        }
        next()
    }

];
exports.deleteCourseSemesterValidator = [

    check('courseSemesterId')
        .notEmpty()
        .isUUID()
        .withMessage('invalid courseSemester id'),
    async (req, res, next) => {
        validatorMiddelware

        const course = await CourseSemester.findOne({
            where: { cycle_ID: req.params.courseSemesterId },
        });
        if (!course) {
            return next(appError.create('CourseSemester not found', 404, httpStatusText.FAIL))

        }
        next()
    },


]


