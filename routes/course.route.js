const express = require('express')
const { getAllCourses, addCourse, getCourse, updateCourse, deletecourse } = require('../controllers/course.controller')

const router = express.Router()
const multer = require('multer');
const verifyToken = require('../middelware/verifyToken');
const allowedTo = require('../middelware/allowedTo');
const userRoles = require('../utils/userRoles');
const { createCourseValidator, getCourseValidator, updateCourseValidator, deleteCourseValidator } = require('../utils/validator/course.validator');



const diskStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/course');
    },
    filename: function (req, file, cb) {
        const ext = file.mimetype.split('/')[1];
        const fileName = `course-${Date.now()}.${ext}`;
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
                   
                   .post(verifyToken, allowedTo(userRoles.ADMIN), upload.single('image_path'),createCourseValidator,addCourse) // createCourseValidator,

router.get('/:facultyId/courses/',verifyToken, getAllCourses)
router.route('/:courseId')
                   .get(verifyToken,getCourseValidator, getCourse)
                   .patch(verifyToken, allowedTo(userRoles.ADMIN),upload.single('image_path'),updateCourseValidator, updateCourse)
                   .delete(verifyToken, allowedTo(userRoles.ADMIN),deleteCourseValidator, deletecourse)



module.exports = router