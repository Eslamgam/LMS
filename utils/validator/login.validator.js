const { check } = require('express-validator')


exports.loginValidator = [
    check('email')
        .notEmpty()
        .withMessage('email is required') ,
    check('user_password')
        .notEmpty()
        .withMessage('user_password is required') 
];





