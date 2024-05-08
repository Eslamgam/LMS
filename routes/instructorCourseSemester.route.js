



const express = require('express')
const { getAllInstructorCourseSemester, addInstructorCourseSemester, getInstructorCourseSemester, deleteInstructorCourseSemester } = require('../controllers/instructorCourseSemester.controller')
const verifyToken = require('../middelware/verifyToken')
const allowedTo = require('../middelware/allowedTo')
const userRoles = require('../utils/userRoles')
const { createInstructorCourseSemesterValidator, getInstructorCourseSemesterValidator, deleteInstructorCourseSemesterValidator } = require('../utils/validator/instructorCourseSemester.validator')

const router = express.Router()


router.route('/')
    .post(verifyToken, allowedTo(userRoles.ADMIN), createInstructorCourseSemesterValidator, addInstructorCourseSemester)


router.get('/:instructorId/instructorCourseSemesters/', verifyToken, getAllInstructorCourseSemester)



router.route('/:instrctorId')
.get( verifyToken, allowedTo(userRoles.ADMIN), getInstructorCourseSemesterValidator, getInstructorCourseSemester)

    .delete(verifyToken, allowedTo(userRoles.ADMIN), deleteInstructorCourseSemesterValidator, deleteInstructorCourseSemester)



module.exports = router