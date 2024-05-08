const express = require('express')
const { getAllCourseSemesters, addCourseSemester, getcourseSemester, deletecourseSemester } = require('../controllers/courseSemester.controller')
const verifyToken = require('../middelware/verifyToken')
const allowedTo = require('../middelware/allowedTo')
const userRoles = require('../utils/userRoles')
const { getCourseSemesterValidator, createCourseSemesterValidator, deleteCourseSemesterValidator } = require('../utils/validator/courseSemester.validator')

const router = express.Router()


router.route('/')
               
               .post(verifyToken,allowedTo(userRoles.ADMIN),createCourseSemesterValidator,addCourseSemester)

router.get('/:semesterId/courseSemesters',verifyToken,allowedTo(userRoles.ADMIN),getAllCourseSemesters)
router.route('/:courseSemesterId')
               .get(verifyToken,allowedTo(userRoles.ADMIN),getCourseSemesterValidator,getcourseSemester)
               .delete(verifyToken,allowedTo(userRoles.ADMIN),deleteCourseSemesterValidator,deletecourseSemester)



module.exports = router