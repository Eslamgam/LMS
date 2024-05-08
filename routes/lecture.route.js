



const express = require('express')
const { getAllLectures, addLecture, getLecture, updateLecture, deleteLecture } = require('../controllers/lecture.controller')
const verifyToken = require('../middelware/verifyToken')
const allowedTo = require('../middelware/allowedTo')
const userRoles = require('../utils/userRoles')
const { createLectureValidator, getLectureValidator, updateLectureValidator, deleteLectureValidator } = require('../utils/validator/lecture.validator')

const router = express.Router()


router.route('/')
.post(verifyToken,allowedTo(userRoles.ADMIN),createLectureValidator,addLecture)

router.get('/:courseCycleId/lectures',verifyToken,getAllLectures)

router.route('/:lectureId')
.get(verifyToken,getLectureValidator,getLecture)
.patch(verifyToken,allowedTo(userRoles.ADMIN),updateLectureValidator,updateLecture)
.delete(verifyToken,allowedTo(userRoles.ADMIN),deleteLectureValidator,deleteLecture)



module.exports = router