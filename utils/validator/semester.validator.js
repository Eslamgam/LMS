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


exports.getSemestereValidator = [

    check('semesterId')
        .notEmpty()
        .isUUID()
        .withMessage('invalid semester id'),
    async (req, res, next) => {
        validatorMiddelware

        const semester = await Semester.findOne({
            where: { semester_ID: req.params.semesterId },
        });
        if (!semester) {
            return next(appError.create('semesterId not found', 404, httpStatusText.FAIL))
        }
        next()
    },


]

exports.createSemesterValidator = [

  
    check('start_Date')
        .notEmpty()
        .withMessage('start_date is required')
        .isDate()
        .withMessage('start_date must be date'),
    check('end_Date')
        .notEmpty()
        .withMessage('start_date is required')
        .isDate()
        .withMessage('start_date must be date'),
    check('years')
        .notEmpty()
        .withMessage('years is required')
        .isNumeric()
        .withMessage('years must be number'),

    check('semester_number')
        .notEmpty()
        .withMessage('semester_number is required')
        .isNumeric()
        .withMessage('semester_number must be number'),


    check('faculty_ID')
        .notEmpty()
        .withMessage('faculty_ID is required') 
        .custom(async (faculty_ID) => {
            const faculty = await Faculty.findOne({
                where: { faculty_ID },
            });

            if (!faculty) {
                return Promise.reject(appError.create('faculty_ID with this ID not found', 404, httpStatusText.ERROR));
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

exports.updateSemesterValidator = [

    check('semesterId')
        .notEmpty()
        .isUUID()
        .withMessage('invalid semester id'),
    async (req, res, next) => {
        validatorMiddelware

        const semester = await Semester.findOne({
            where: { semester_ID: req.params.semesterId },
        });
        if (!semester) {
            return next(appError.create('semesterId not found', 404, httpStatusText.FAIL))
        }
        next()
    },


]
exports.deleteSemesterValidator = [

    check('semesterId')
        .notEmpty()
        .isUUID()
        .withMessage('invalid semester id'),
    async (req, res, next) => {
        validatorMiddelware

        const semester = await Semester.findOne({
            where: { semester_ID: req.params.semesterId },
        });
        if (!semester) {
            return next(appError.create('semesterId not found', 404, httpStatusText.FAIL))
        }
        next()
    },


]


