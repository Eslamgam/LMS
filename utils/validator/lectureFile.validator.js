const { check ,validationResult} = require('express-validator')
const validatorMiddelware = require('../../middelware/validatorMiddelware')
const Course = require('../../models/course.model')
const Faculty = require('../../models/faculty.model')
const appError = require('../appError')

const httpStatusText = require('../httpStatusText');
const Lecture = require('../../models/lecture.model')
const CourseSemester = require('../../models/courseSemester.model')
const LectureFile = require('../../models/lectureFile.model')
const { lectureFileImagePath } = require('../../middelware/imagePath')


exports.getLectureFileValidator = [

    check('lectureFileId')
        .notEmpty()
        .isUUID()
        .withMessage('invalid lectureFile id'),
    async (req, res, next) => {
        validatorMiddelware

        const lecturefile = await LectureFile.findOne({
            where: { lecture_file_ID: req.params.lectureFileId },
        });
        if (!lecturefile) {
            return next(appError.create('lecturefile not found', 404, httpStatusText.FAIL))
        }
        next()
    },


]

exports.createLectureFileValidator = [

   
    lectureFileImagePath,
   

    check('file_path')
        .notEmpty()
        .withMessage('file_path is required') ,


    check('lecture_file_name')
        .notEmpty()
        .withMessage('lecture_type is required') ,


    check('lecture_ID')
        .notEmpty()
        .withMessage('lecture_ID is required') 
        .custom(async (lecture_ID) => {
            const lecture = await Lecture.findOne({
                where: {lecture_ID },
            });

            if (!lecture) {
                return Promise.reject(appError.create('lecture with this ID not found', 404, httpStatusText.ERROR));
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

exports.updateLectureFileValidator = [

    check('lectureFileId')
        .notEmpty()
        .isUUID()
        .withMessage('invalid lectureFile id'),
    async (req, res, next) => {
        validatorMiddelware

        const lecturefile = await LectureFile.findOne({
            where: { lecture_file_ID: req.params.lectureFileId },
        });
        if (!lecturefile) {
            return next(appError.create('lecturefile not found', 404, httpStatusText.FAIL))
        }
        next()
    },


]
exports.deleteLectureFileValidator = [

    check('lectureFileId')
        .notEmpty()
        .isUUID()
        .withMessage('invalid lectureFile id'),
    async (req, res, next) => {
        validatorMiddelware

        const lecturefile = await LectureFile.findOne({
            where: { lecture_file_ID: req.params.lectureFileId },
        });
        if (!lecturefile) {
            return next(appError.create('lecturefile not found', 404, httpStatusText.FAIL))
        }
        next()
    },


]


