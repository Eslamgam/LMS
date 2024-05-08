



const express = require('express')
const { getAllStudentEnrollment, addStudentEnrollment, getStudentEnrollment, deleteStudentEnrollment } = require('../controllers/studentEnrollment.controller')
const verifyToken = require('../middelware/verifyToken')
const allowedTo = require('../middelware/allowedTo')
const userRoles = require('../utils/userRoles')
const { createStudentEnrollmentValidator, getStudentEnrollmentValidator, deleteStudentEnrollmentValidator } = require('../utils/validator/studentEnrollment.validator')

const router = express.Router()


router.route('/')
                 .post(verifyToken,allowedTo(userRoles.ADMIN),createStudentEnrollmentValidator,addStudentEnrollment)
router.get('/:studentId/courses',verifyToken,allowedTo(userRoles.ADMIN),getAllStudentEnrollment)

router.route('/:studentId') 
                .get(verifyToken,allowedTo(userRoles.ADMIN),getStudentEnrollmentValidator,getStudentEnrollment)
                .delete(verifyToken,allowedTo(userRoles.ADMIN),deleteStudentEnrollmentValidator,deleteStudentEnrollment)



module.exports = router