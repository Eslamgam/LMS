



const express = require('express')
const { getAllSemester, addsemester, getsemester, updatesemester, deleteSemester } = require('../controllers/Semester.controller')
const verifyToken = require('../middelware/verifyToken')
const allowedTo = require('../middelware/allowedTo')
const userRoles = require('../utils/userRoles')
const { createSemesterValidator, getSemestereValidator, updateSemesterValidator, deleteSemesterValidator } = require('../utils/validator/semester.validator')

const router = express.Router()


router.route('/')

    .post(verifyToken, allowedTo(userRoles.ADMIN),createSemesterValidator, addsemester)

router.get('/:facultyId/semesters/', verifyToken, allowedTo(userRoles.ADMIN), getAllSemester)
router.route('/:semesterId')
    .get(verifyToken, allowedTo(userRoles.ADMIN),getSemestereValidator, getsemester)
    .patch(verifyToken, allowedTo(userRoles.ADMIN),updateSemesterValidator, updatesemester)
    .delete(verifyToken, allowedTo(userRoles.ADMIN),deleteSemesterValidator, deleteSemester)



module.exports = router