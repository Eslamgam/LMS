

const express = require('express')
const { getAllUniversity, addUniversity, getOneUniversity, updateUniversity, deletedUniversity } = require('../controllers/univer.controller')
const verifyToken = require('../middelware/verifyToken')
const allowedTo = require('../middelware/allowedTo')
const userRoles = require('../utils/userRoles')

const router = express.Router()
const multer = require('multer');
const { createUniversityValidator, getUniversityValidator, updateUniversityValidator, deleteUniversityValidator } = require('../utils/validator/university.validator')


const diskStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/university');
    },
    filename: function (req, file, cb) {
        const ext = file.mimetype.split('/')[1];
        const fileName = `university-${Date.now()}.${ext}`;
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
.get(verifyToken,allowedTo(userRoles.ADMIN),getAllUniversity)
.post(verifyToken,allowedTo(userRoles.ADMIN),upload.single('Logo_path'),createUniversityValidator,addUniversity)

router.route('/:universityId')
.get(verifyToken,allowedTo(userRoles.ADMIN),getUniversityValidator,getOneUniversity)
.patch(verifyToken,allowedTo(userRoles.ADMIN),upload.single('Logo_path'),updateUniversityValidator,updateUniversity)
.delete(verifyToken,allowedTo(userRoles.ADMIN),deleteUniversityValidator,deletedUniversity)


module.exports = router