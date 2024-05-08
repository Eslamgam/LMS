



const express = require('express')
const { getAllStudentsInformation, addStudentsInformation, getOneStudentInformation, updateStudentInformation, deleteStudentInformation } = require('../controllers/studentInformation.controller')
const verifyToken = require('../middelware/verifyToken')
const allowedTo = require('../middelware/allowedTo')
const userRoles = require('../utils/userRoles')
const { createStudentsInformationValidator, getStudentsInformationValidator, updateStudentsInformationValidator, deleteStudentsInformationValidator } = require('../utils/validator/studentsInformation.validator')

const router = express.Router()


router.route('/')
                 .post(verifyToken,allowedTo(userRoles.ADMIN),createStudentsInformationValidator,addStudentsInformation)

router.get('/:departmentId/students/',verifyToken,allowedTo(userRoles.ADMIN),getAllStudentsInformation)
router.route('/:academicId') 
                .get(verifyToken,getStudentsInformationValidator,getOneStudentInformation)
                .patch(verifyToken,allowedTo(userRoles.ADMIN),updateStudentsInformationValidator,updateStudentInformation)
                .delete(verifyToken,allowedTo(userRoles.ADMIN),deleteStudentsInformationValidator,deleteStudentInformation)



module.exports = router