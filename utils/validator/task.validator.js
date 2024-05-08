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
const Task = require('../../models/task.model')
const { taskImagePath } = require('../../middelware/imagePath')


exports.getTaskValidator = [

    check('taskId')
        .notEmpty()
        .isUUID()
        .withMessage('  invalid task  id'),
    async (req, res, next) => {
        validatorMiddelware

        const task = await Task.findOne({
            where: { task_ID: req.params.taskId },
        });
        if (!task) {
            return next(appError.create('task not found', 404, httpStatusText.FAIL))
        }
        next()
    },


]

exports.createTaskValidator = [

taskImagePath,
    check('task_title')
        .notEmpty()
        .withMessage('task_title is required'),
    check('start_date')
        .notEmpty()
        .withMessage('start_date is required')
        .isDate()
        .withMessage('start_date must be date'),
    check('end_date')
        .notEmpty()
        .withMessage('start_date is required')
        .isDate()
        .withMessage('start_date must be date'),

    check('task_grade')
        .notEmpty()
        .withMessage('task_grade is required')
        .isNumeric()
        .withMessage('task_grade must be number'),

    check('file_path')
        .notEmpty()
        .withMessage('student_level is required'),

    check('instructor_ID')
        .notEmpty()
        .withMessage('instructor_ID is required') 
        .custom(async (instructor_ID) => {
            const user = await User.findOne({
                where: { user_ID: instructor_ID },
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
        .withMessage('course_name is required')
        .custom(async (course_cycle_ID) => {
            const courseSemester = await CourseSemester.findOne({
                where: { cycle_ID: course_cycle_ID },
            });

            if (!courseSemester) {
                return Promise.reject(appError.create('courseSemester with this ID not found', 404, httpStatusText.ERROR));
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

exports.updateTaskValidator = [

    check('taskId')
        .notEmpty()
        .isUUID()
        .withMessage('  invalid task  id'),
    async (req, res, next) => {
        validatorMiddelware

        const task = await Task.findOne({
            where: { task_ID: req.params.taskId },
        });
        if (!task) {
            return next(appError.create('task not found', 404, httpStatusText.FAIL))
        }
        next()
    },


]
exports.deleteTaskValidator = [

    check('taskId')
        .notEmpty()
        .isUUID()
        .withMessage('  invalid task  id'),
    async (req, res, next) => {
        validatorMiddelware

        const task = await Task.findOne({
            where: { task_ID: req.params.taskId },
        });
        if (!task) {
            return next(appError.create('task not found', 404, httpStatusText.FAIL))
        }
        next()
    },


]
