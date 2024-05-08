const { check } = require('express-validator');
const { userImagePath } = require('../../middelware/imagePath');

exports.registerValidator = [
    userImagePath,
    check('full_name')
        .notEmpty()
        .withMessage('full_name is required'),
    check('email')
        .notEmpty()
        .withMessage('email is required'),
    check('user_password')
        .notEmpty()
        .withMessage('user_password is required'),

    check('phone')
        .notEmpty()
        .withMessage('phone is required'),
    check('image_path')
        .notEmpty()
        .withMessage('image_path is required')
];





