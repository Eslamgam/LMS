const express = require('express')
const { addTaskAnswer, getTaskAnswer } = require('../controllers/taskAnswer.controller')

const router = express.Router()
const multer = require('multer');
const appError = require('../utils/appError');

const httpStatusText = require('../utils/httpStatusText');
const verifyToken = require('../middelware/verifyToken');
const allowedTo = require('../middelware/allowedTo');
const userRoles = require('../utils/userRoles');
const { createTaskAnswerValidator, getTaskAnswerValidator } = require('../utils/validator/taskAnswer.validator');


const diskStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/taskanswers');
    },
    filename: function (req, file, cb) {
        const ext = file.mimetype.split('/')[1];
        const fileName = `taskanswers-${Date.now()}.${ext}`;
        cb(null, fileName);
    }
})

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'application/pdf') {
        return cb(null, true)
    } else {
        return cb(appError.create('file must be an pdf', 400,httpStatusText.ERROR), false)
    }
}

const upload = multer({
    storage: diskStorage,
    fileFilter
})

router.route('/').post(verifyToken,allowedTo(userRoles.USER),upload.single('file_path'),createTaskAnswerValidator,addTaskAnswer)


router.route('/:taskAnswerId').get(verifyToken,allowedTo(userRoles.ADMIN),getTaskAnswerValidator,getTaskAnswer)



module.exports = router