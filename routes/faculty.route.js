



const express = require('express')
const { getAllFacultys, addFaculty, getFaculty, updateFaculty, deleteFaculty } = require('../controllers/faculty.controller')

const router = express.Router()
const multer = require('multer');
const verifyToken = require('../middelware/verifyToken');
const allowedTo = require('../middelware/allowedTo');
const userRoles = require('../utils/userRoles');
const { createFacultyValidator, getFacultyValidator, updateFacultyValidator, deleteFacultyValidator } = require('../utils/validator/faculty.validator');



const diskStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/faculty');
    },
    filename: function (req, file, cb) {
        const ext = file.mimetype.split('/')[1];
        const fileName = `faculty-${Date.now()}.${ext}`;
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

router.route('/')
    .post(verifyToken, allowedTo(userRoles.ADMIN), upload.single('Logo_path'), createFacultyValidator, addFaculty)

router.get('/:universityId/faculties', verifyToken, allowedTo(userRoles.ADMIN), getAllFacultys)


router.route('/:facultyId')
    .get(verifyToken, allowedTo(userRoles.ADMIN), getFacultyValidator, getFaculty)
    .patch(verifyToken, allowedTo(userRoles.ADMIN), updateFacultyValidator, updateFaculty)
    .delete(verifyToken, allowedTo(userRoles.ADMIN), upload.single('Logo_path'), deleteFacultyValidator, deleteFaculty)



module.exports = router