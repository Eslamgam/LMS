const { check, validationResult } = require('express-validator')
const validatorMiddelware = require('../../middelware/validatorMiddelware')
const appError = require('../appError')
const httpStatusText = require('../httpStatusText');
const University = require('../../models/univer.model');
const { universityImagePath } = require('../../middelware/imagePath');


exports.getUniversityValidator = [

    check('universityId')
        .notEmpty()
        .isUUID()
        .withMessage('  invalid university  id'),
    async (req, res, next) => {
        validatorMiddelware

        const university = await University.findOne({
            where: { university_ID: req.params.universityId },
        });
        if (!university) {
            return next(appError.create('university not found', 404, httpStatusText.FAIL))
        }
        next()
    },


]

exports.createUniversityValidator = [
    universityImagePath,
    check('university_name')
        .notEmpty()
        .withMessage('university_name is required'),

    check('Logo_path')
        .notEmpty()
        .withMessage('Logo_path is required')
];

exports.updateUniversityValidator = [

    check('universityId')
        .notEmpty()
        .isUUID()
        .withMessage('  invalid university  id'),
    async (req, res, next) => {
        validatorMiddelware

        const university = await University.findOne({
            where: { university_ID: req.params.universityId },
        });
        if (!university) {
            return next(appError.create('university not found', 404, httpStatusText.FAIL))
        }
        next()
    },


]
exports.deleteUniversityValidator = [

    check('universityId')
        .notEmpty()
        .isUUID()
        .withMessage('  invalid university  id'),
    async (req, res, next) => {
        validatorMiddelware

        const university = await University.findOne({
            where: { university_ID: req.params.universityId },
        });
        if (!university) {
            return next(appError.create('university not found', 404, httpStatusText.FAIL))
        }
        next()
    },


]
