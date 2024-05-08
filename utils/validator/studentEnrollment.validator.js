const { check, validationResult } = require('express-validator')
const validatorMiddelware = require('../../middelware/validatorMiddelware')
const Course = require('../../models/course.model')
const Faculty = require('../../models/faculty.model')
const appError = require('../appError')

const httpStatusText = require('../httpStatusText');
const Lecture = require('../../models/lecture.model')
const CourseSemester = require('../../models/courseSemester.model')
const LectureFile = require('../../models/lectureFile.model')
const Semester = require('../../models/semester.model')
const StudentEnrollment = require('../../models/studentEnrollment.model')
const User = require('../../models/user.model')


exports.getStudentEnrollmentValidator = [

    check('studentEnrollmentId')
        .notEmpty()
        .isUUID()
        .withMessage('  invalid studentEnrollment  id'),
    async (req, res, next) => {
        validatorMiddelware

        const student = await StudentEnrollment.findOne({
            where: {user_ID : req.params.studentEnrollmentId },
        });
        if (!student) {
            return next(appError.create('student not found', 404, httpStatusText.FAIL))
        }
        next()
    },


]

exports.createStudentEnrollmentValidator = [


        check('student_ID')
        .notEmpty()
        .withMessage('student_ID is required')
        .custom(async (student_ID) => {
            const user = await User.findOne({
                where: { user_ID: student_ID },
            });
            if (!user) {
                return Promise.reject(appError.create('user with this ID not found', 404, httpStatusText.ERROR));
            }
        }),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return next(appError.create(errors.array(), 400, httpStatusText.FAIL));
        }
        next()
    },
    check('course_cycle_ID')
    .notEmpty()
    .withMessage('course_cycle_ID is required') 
    .custom(async (course_cycle_ID) => {
        const course = await CourseSemester.findOne({
            where: {cycle_ID: course_cycle_ID },
        });

        if (!course) {
            return Promise.reject(appError.create('CourseSemester with this ID not found', 404, httpStatusText.ERROR));
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

exports.deleteStudentEnrollmentValidator = [

    check('studentEnrollmentId')
        .notEmpty()
        .isUUID()
        .withMessage('  invalid studentEnrollment  id'),
    async (req, res, next) => {
        validatorMiddelware

        const student = await StudentEnrollment.findOne({
            where: {user_ID : req.params.studentEnrollmentId },
        });
        if (!student) {
            return next(appError.create('student not found', 404, httpStatusText.FAIL))
        }
        next()
    },


]

