const { check ,validationResult} = require('express-validator')
const validatorMiddelware = require('../../middelware/validatorMiddelware')
const Faculty = require('../../models/faculty.model')
const appError = require('../appError')

const httpStatusText = require('../httpStatusText');
const New = require('../../models/new.model')
const User = require('../../models/user.model')
const {  newFilePath } = require('../../middelware/imagePath')


exports.getNewValidator = [

    check('newId')
        .notEmpty()
        .isUUID()
        .withMessage('invalid new id'),
    async (req, res, next) => {
        validatorMiddelware

        const news = await New.findOne({
            where: { new_ID: req.params.newId },
        });
        if (!news) {
            return next(appError.create('new not found', 404, httpStatusText.FAIL))
        }
        next()
    },


]

exports.createNewValidator = [

    
    newFilePath,
    check('content')
        .notEmpty()
        .withMessage('lecture_file_ID is required'),

    check('file_path')
        .notEmpty()
        .withMessage('file_path is required') ,


    check('user_ID')
        .notEmpty()
        .withMessage('user_ID is required') 
        .custom(async (user_ID) => {
            const user = await User.findOne({
                where: {user_ID },
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


    check('faculty_ID')
        .notEmpty()
        .withMessage('faculty_ID is required') 
        .custom(async (faculty_ID) => {
            const faculty = await Faculty.findOne({
                where: {faculty_ID },
            });
            if (!faculty) {
                return Promise.reject(appError.create('faculty with this ID not found', 404, httpStatusText.ERROR));
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

exports.updateNewValidator =  [

    check('newId')
        .notEmpty()
        .isUUID()
        .withMessage('invalid new id'),
    async (req, res, next) => {
        validatorMiddelware

        const news = await New.findOne({
            where: { new_ID: req.params.newId },
        });
        if (!news) {
            return next(appError.create('new not found', 404, httpStatusText.FAIL))
        }
        next()
    },


]
exports.deleteNewValidator =  [

    check('newId')
        .notEmpty()
        .isUUID()
        .withMessage('invalid new id'),
    async (req, res, next) => {
        validatorMiddelware

        const news = await New.findOne({
            where: { new_ID: req.params.newId },
        });
        if (!news) {
            return next(appError.create('new not found', 404, httpStatusText.FAIL))
        }
        next()
    },


]


