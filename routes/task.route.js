



const express = require('express')
const { getAllTasks, addTask, getTask, updateTask, deleteTask } = require('../controllers/task.controller')

const router = express.Router()
const multer = require('multer');
const appError = require('../utils/appError');

const httpStatusText = require('../utils/httpStatusText');
const verifyToken = require('../middelware/verifyToken');
const allowedTo = require('../middelware/allowedTo');
const userRoles = require('../utils/userRoles');
const { createTaskValidator, getTaskValidator, updateTaskValidator, deleteTaskValidator } = require('../utils/validator/task.validator');


const diskStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/tasks');
    },
    filename: function (req, file, cb) {
        const ext = file.mimetype.split('/')[1];
        const fileName = `task-${Date.now()}.${ext}`;
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

.post(verifyToken,allowedTo(userRoles.ADMIN),upload.single('file_path'),createTaskValidator,addTask)



router.get('/:courseCycleId/tasks',verifyToken,getAllTasks)
router.route('/:taskId')
.get(verifyToken,getTaskValidator,getTask)
.patch(verifyToken,allowedTo(userRoles.ADMIN),updateTaskValidator,updateTask)
.delete(verifyToken,allowedTo(userRoles.ADMIN),deleteTaskValidator,deleteTask)



module.exports = router