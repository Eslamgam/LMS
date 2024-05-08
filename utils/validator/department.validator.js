const { check ,validationResult} = require('express-validator')
const validatorMiddelware = require('../../middelware/validatorMiddelware')
const Course = require('../../models/course.model')
const Faculty = require('../../models/faculty.model')
const appError = require('../appError')

const httpStatusText = require('../httpStatusText');
const Department = require('../../models/department.model')

exports.getDepartmentValidator = [

    check('departmentId')
        .notEmpty()
        .isUUID()
        .withMessage('invalid department id'),
    async (req, res, next) => {
        validatorMiddelware

        const course = await Department.findOne({
            where: { department_ID: req.params.departmentId },
        });
        if (!course) {
            return next(appError.create('department not found', 404, httpStatusText.FAIL))

        }
        next()
    },


]

exports.createDepartmentValidator = [
  


    check('department_name')
        .notEmpty()
        .withMessage('department_name is required'),

    check('faculty_ID')
        .notEmpty()
        .withMessage('faculty_ID is required') 
        .custom(async (faculty_ID) => {
            const faculty = await Faculty.findOne({
                where: { faculty_ID },
            });

            if (!faculty) {
                return Promise.reject(appError.create('Faculty with this ID not found', 404, httpStatusText.ERROR));
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

exports.updateDepartmentValidator = [

    check('departmentId')
        .notEmpty()
        .isUUID()
        .withMessage('invalid department id'),
    async (req, res, next) => {
        validatorMiddelware

        const course = await Department.findOne({
            where: { department_ID: req.params.departmentId },
        });
        if (!course) {
            return next(appError.create('department not found', 404, httpStatusText.FAIL))

        }
        next()
    },


]
exports.deleteDepartmentValidator = [

    check('departmentId')
        .notEmpty()
        .isUUID()
        .withMessage('invalid department id'),
    async (req, res, next) => {
        validatorMiddelware

        const course = await Department.findOne({
            where: { department_ID: req.params.departmentId },
        });
        if (!course) {
            return next(appError.create('department not found', 404, httpStatusText.FAIL))

        }
        next()
    },


]


