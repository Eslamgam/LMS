



const express = require('express')
const { getAllLectureFiles, addLectureFile, getLectureFile, updateLectureFile, deleteLectureFile, addLectureFileToLectue } = require('../controllers/lectureFile.controller')

const router = express.Router()
const multer = require('multer');
const appError = require('../utils/appError');

const httpStatusText = require('../utils/httpStatusText');
const verifyToken = require('../middelware/verifyToken');
const allowedTo = require('../middelware/allowedTo');
const userRoles = require('../utils/userRoles');
const { createLectureFileValidator, updateLectureFileValidator, deleteLectureFileValidator, getLectureFileValidator } = require('../utils/validator/lectureFile.validator');


const diskStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/lecturefile');
    },
    filename: function (req, file, cb) {
        const ext = file.mimetype.split('/')[1];
        const fileName = `lecturefile-${Date.now()}.${ext}`;
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

router.route('/')

.post(verifyToken,allowedTo(userRoles.ADMIN),upload.single('file_path'),createLectureFileValidator,addLectureFile)

router.get('/:lectureId/lecturefiles',verifyToken,getAllLectureFiles)
// router.route('/:lectureId').post(verifyToken, allowedTo(userRoles.ADMIN),upload.single('file_path'), addLectureFileToLectue)

router.route('/:lectureFileId')
.get(verifyToken,getLectureFileValidator,getLectureFile)
.patch(verifyToken,allowedTo(userRoles.ADMIN),updateLectureFileValidator,updateLectureFile)
.delete(verifyToken,allowedTo(userRoles.ADMIN),deleteLectureFileValidator,deleteLectureFile)



module.exports = router