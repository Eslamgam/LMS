const { check ,validationResult} = require('express-validator')
const validatorMiddelware = require('../../middelware/validatorMiddelware')
const Course = require('../../models/course.model')
const Faculty = require('../../models/faculty.model')
const appError = require('../appError')

const httpStatusText = require('../httpStatusText');
const Lecture = require('../../models/lecture.model')
const CourseSemester = require('../../models/courseSemester.model')


exports.getLectureValidator = [

    check('lectureId')
        .notEmpty()
        .isUUID()
        .withMessage('invalid lecture id'),
    async (req, res, next) => {
        validatorMiddelware

        const lecture = await Lecture.findOne({
            where: { lecture_ID: req.params.lectureId },
        });
        if (!lecture) {
            return next(appError.create('lecture not found', 404, httpStatusText.FAIL))

        }
        next()
    },


]

exports.createLectureValidator = [

   

    check('lecture_title')
        .notEmpty()
        .withMessage('lecture_title is required') 
        .isLength({ min: 3, max: 250 }) 
        .withMessage('lecture_title must be between 3 and 32 characters'),

    check('lecture_type')
        .notEmpty()
        .withMessage('lecture_type is required') ,


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

exports.updateLectureValidator = [

    check('lectureId')
        .notEmpty()
        .isUUID()
        .withMessage('invalid lecture id'),
    async (req, res, next) => {
        validatorMiddelware

        const lecture = await Lecture.findOne({
            where: { lecture_ID: req.params.lectureId },
        });
        if (!lecture) {
            return next(appError.create('lecture not found', 404, httpStatusText.FAIL))

        }
        next()
    },


]
exports.deleteLectureValidator = [

    check('lectureId')
        .notEmpty()
        .isUUID()
        .withMessage('invalid lecture id'),
    async (req, res, next) => {
        validatorMiddelware

        const lecture = await Lecture.findOne({
            where: { lecture_ID: req.params.lectureId },
        });
        if (!lecture) {
            return next(appError.create('lecture not found', 404, httpStatusText.FAIL))

        }
        next()
    },


]


