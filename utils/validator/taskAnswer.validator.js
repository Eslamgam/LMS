const { check, validationResult } = require('express-validator')
const validatorMiddelware = require('../../middelware/validatorMiddelware')
const appError = require('../appError')
const httpStatusText = require('../httpStatusText');
const User = require('../../models/user.model')
const Task = require('../../models/task.model')
const TaskAnswer = require('../../models/taskAnswer.model');
const { taskAnswerImagePath } = require('../../middelware/imagePath');


exports.getTaskAnswerValidator = [

    check('taskAnswerId')
        .notEmpty()
        .isUUID()
        .withMessage('  invalid taskAnswer  id'),
    async (req, res, next) => {
        validatorMiddelware

        const taskAnswer = await TaskAnswer.findOne({
            where: { task_ID: req.params.taskAnswerId },
        });
        if (!taskAnswer) {
            return next(appError.create('taskAnswer not found', 404, httpStatusText.FAIL))
        }
        next()
    },


]

exports.createTaskAnswerValidator = [

taskAnswerImagePath,

    check('task_answer_grade')
        .notEmpty()
        .withMessage('task_answer_grade is required')
        .isNumeric()
        .withMessage('task_answer_grade must be number'),

    check('file_path')
        .notEmpty()
        .withMessage('student_level is required'),

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
    check('task_ID')
        .notEmpty()
        .withMessage('task_ID is required')
        .custom(async (task_ID) => {
            const task = await Task.findOne({
                where: { task_ID },
            });

            if (!task) {
                return Promise.reject(appError.create('Task with this ID not found', 404, httpStatusText.ERROR));
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

