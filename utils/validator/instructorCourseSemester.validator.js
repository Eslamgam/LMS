const { check ,validationResult} = require('express-validator')
const validatorMiddelware = require('../../middelware/validatorMiddelware')
const Course = require('../../models/course.model')
const Faculty = require('../../models/faculty.model')
const appError = require('../appError')

const httpStatusText = require('../httpStatusText');
const InstructorCourseSemester = require('../../models/instructorCourseSemester.model')
const CourseSemester = require('../../models/courseSemester.model')
const User = require('../../models/user.model')

exports.getInstructorCourseSemesterValidator = [

    check('courseId')
        .notEmpty()
        .isUUID()
        .withMessage('invalid courseId id'),
    async (req, res, next) => {
        validatorMiddelware

        const instructorCourseSemester = await InstructorCourseSemester.findOne({
            where: { course_cycle_ID: req.params.courseId },
        });
        if (!instructorCourseSemester) {
            return next(appError.create('instructorCourseSemester not found', 404, httpStatusText.FAIL))

        }
        next()
    },


]

exports.createInstructorCourseSemesterValidator = [
    check('instructor_ID')
        .notEmpty()
        .withMessage('instructor_ID is required') 
        .custom(async (instructor_ID) => {
            const user = await User.findOne({
                where: { user_ID:instructor_ID },
            });

            if (!user) {
                return Promise.reject(appError.create('user with this ID not found', 404, httpStatusText.ERROR));
            }
        }),

    (req, res, next)=>{
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return next(appError.create(errors.array(), 400, httpStatusText.FAIL));
        }
        next()
    },

    check('course_cycle_ID')
        .notEmpty()
        .withMessage('course_name is required') 
        .custom(async (course_cycle_ID) => {
            const courseSemester = await CourseSemester.findOne({
                where: { cycle_ID:course_cycle_ID },
            });

            if (!courseSemester) {
                return Promise.reject(appError.create('courseSemester with this ID not found', 404, httpStatusText.ERROR));
            }
        }),

    (req, res, next)=>{
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return next(appError.create(errors.array(), 400, httpStatusText.FAIL));
        }
        next()
    }
];
exports.deleteInstructorCourseSemesterValidator =[

    check('instructorCourseSemesterId')
        .notEmpty()
        .isUUID()
        .withMessage('invalid instructorCourseSemester id'),
    async (req, res, next) => {
        validatorMiddelware

        const instructorCourseSemester = await InstructorCourseSemester.findOne({
            where: { instructor_ID: req.params.instructorCourseSemesterId },
        });
        if (!instructorCourseSemester) {
            return next(appError.create('instructorCourseSemester not found', 404, httpStatusText.FAIL))

        }
        next()
    },


]


