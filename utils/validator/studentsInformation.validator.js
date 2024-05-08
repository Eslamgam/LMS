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
const StudentInformation = require('../../models/studentInformation.model')
const User = require('../../models/user.model')
const Department = require('../../models/department.model')


exports.getStudentsInformationValidator = [

    check('studentInformationId')
        .notEmpty()
        .isUUID()
        .withMessage('  invalid studentInformation  id'),
    async (req, res, next) => {
        validatorMiddelware

        const student = await StudentInformation.findOne({
            where: { academic_ID: req.params.studentInformationId },
        });
        if (!student) {
            return next(appError.create('student not found', 404, httpStatusText.FAIL))
        }
        next()
    },


]

exports.createStudentsInformationValidator = [

    

    check('academic_ID')
        .notEmpty()
        .withMessage('academic_ID is required'),

    check('student_level')
        .notEmpty()
        .withMessage('student_level is required')
        .isNumeric()
        .withMessage('student_level is must be number'),
    check('user_ID')
        .notEmpty()
        .withMessage('user_ID is required')
        .custom(async (user_ID) => {
            const user = await User.findOne({
                where: {  user_ID },
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
    check('department_ID')
        .notEmpty()
        .withMessage('department_ID is required') 
        .custom(async (department_ID) => {
            const department = await Department.findOne({
                where: { department_ID },
            });

            if (!department) {
                return Promise.reject(appError.create('department with this ID not found', 404, httpStatusText.ERROR));
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

exports.updateStudentsInformationValidator = [

    check('studentInformationId')
        .notEmpty()
        .isUUID()
        .withMessage('  invalid studentInformation  id'),
    async (req, res, next) => {
        validatorMiddelware

        const student = await StudentInformation.findOne({
            where: { academic_ID: req.params.studentInformationId },
        });
        if (!student) {
            return next(appError.create('student not found', 404, httpStatusText.FAIL))
        }
        next()
    },


]
exports.deleteStudentsInformationValidator = [

    check('studentInformationId')
        .notEmpty()
        .isUUID()
        .withMessage('  invalid studentInformation  id'),
    async (req, res, next) => {
        validatorMiddelware

        const student = await StudentInformation.findOne({
            where: { academic_ID: req.params.studentInformationId },
        });
        if (!student) {
            return next(appError.create('student not found', 404, httpStatusText.FAIL))
        }
        next()
    },


]
