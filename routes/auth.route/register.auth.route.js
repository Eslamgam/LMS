
const express = require('express')

const multer = require('multer');
const { register } = require('../../controllers/auth.controller.js/register');
const { registerValidator } = require('../../utils/validator/register.validator');
const allowedTo = require('../../middelware/allowedTo');
const userRoles = require('../../utils/userRoles');
const verifyToken = require('../../middelware/verifyToken');

const router = express.Router()

const diskStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/users');
    },
    filename: function (req, file, cb) {
        const ext = file.mimetype.split('/')[1];
        const fileName = `user-${Date.now()}.${ext}`;
        cb(null, fileName);
    }
})

const fileFilter = (req, file, cb) => {
    const imageType = file.mimetype.split('/')[0];

    if (imageType === 'image') {
        return cb(null, true)
    } else {
        return cb(appError.create('file must be an image', 400), false)
    }
}

const upload = multer({
    storage: diskStorage,
    fileFilter
})



router.route('/signup').post(upload.single('image_path'),registerValidator,register)

module.exports = router
