



const express = require('express')
const { getAllNews, addNew, getNew, updateNew, deletenew } = require('../controllers/new.controller')

const router = express.Router()
const multer = require('multer');
const appError = require('../utils/appError');

const httpStatusText = require('../utils/httpStatusText');
const verifyToken = require('../middelware/verifyToken');
const allowedTo = require('../middelware/allowedTo');
const userRoles = require('../utils/userRoles');
const { createNewValidator, updateNewValidator, deleteNewValidator, getNewValidator } = require('../utils/validator/new.validator');


const diskStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/new');
    },
    filename: function (req, file, cb) {
        const ext = file.mimetype.split('/')[1];
        const fileName = `new-${Date.now()}.${ext}`;
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

router.route('/').post(verifyToken,allowedTo(userRoles.ADMIN),upload.single('file_path'),createNewValidator,addNew)
router.get('/:facultyId/news',verifyToken,getAllNews)

router.route('/:newId')
.get(verifyToken,getNewValidator,getNew)
.patch(verifyToken,allowedTo(userRoles.ADMIN),updateNewValidator,updateNew)
.delete(verifyToken,allowedTo(userRoles.ADMIN),deleteNewValidator,deletenew)



module.exports = router