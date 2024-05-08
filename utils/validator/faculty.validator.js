const { check ,validationResult} = require('express-validator')
const validatorMiddelware = require('../../middelware/validatorMiddelware')
const Course = require('../../models/course.model')
const Faculty = require('../../models/faculty.model')
const appError = require('../appError')

const httpStatusText = require('../httpStatusText');
const University = require('../../models/univer.model')
const { facultyImagePath } = require('../../middelware/imagePath')


exports.getFacultyValidator = [

    check('facultyId')
        .notEmpty()
        .isUUID()
        .withMessage('invalid faculty id'),
    async (req, res, next) => {
        validatorMiddelware

        const faculty = await Faculty.findOne({
            where: { faculty_ID: req.params.facultyId },
        });
        if (!faculty) {
            return next(appError.create('faculty not found', 404, httpStatusText.FAIL))

        }
        next()
    },


]
exports.createFacultyValidator = [

facultyImagePath,
    check('university_ID')
        .notEmpty()
        .withMessage('university_ID is required')
        .custom(async (university_ID) => {
            const university = await University.findOne({
                where: { university_ID },
            });

            if (!university) {
                return Promise.reject(appError.create('university with this ID not found', 404, httpStatusText.ERROR));
            }
        }),
    (req, res, next)=>{
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return next(appError.create(errors.array(), 400, httpStatusText.FAIL));
        }
        next()
    },


    check('faculty_name')
        .notEmpty()
        .withMessage('faculty_name, is required') ,


    check('Logo_path')
        .notEmpty()
        .withMessage('image_path is required'), 
      

    check('levels')
    .notEmpty()
    .withMessage('levels is required')
    .isNumeric() 
    .withMessage('level must be a number')
    .isInt({ min: 1, max: 4 }) 
    .withMessage('levels must be between 1 and 4'),
   
];

exports.updateFacultyValidator = [

    check('facultyId')
        .notEmpty()
        .isUUID()
        .withMessage('invalid faculty id'),
    async (req, res, next) => {
        validatorMiddelware

        const faculty = await Faculty.findOne({
            where: { faculty_ID: req.params.facultyId },
        });
        if (!faculty) {
            return next(appError.create('faculty not found', 404, httpStatusText.FAIL))

        }
        next()
    },


]
exports.deleteFacultyValidator = [

    check('facultyId')
        .notEmpty()
        .isUUID()
        .withMessage('invalid faculty id'),
    async (req, res, next) => {
        validatorMiddelware

        const faculty = await Faculty.findOne({
            where: { faculty_ID: req.params.facultyId },
        });
        if (!faculty) {
            return next(appError.create('faculty not found', 404, httpStatusText.FAIL))

        }
        next()
    },


]


