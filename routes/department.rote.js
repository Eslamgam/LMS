const express = require('express')
const { getAllDepartments, getDepartment, updateDepartment, deletedepartment, addDepartment } = require('../controllers/department.controller')
const verifyToken = require('../middelware/verifyToken')
const allowedTo = require('../middelware/allowedTo')
const userRoles = require('../utils/userRoles')
const { createDepartmentValidator, getDepartmentValidator, updateDepartmentValidator, deleteDepartmentValidator } = require('../utils/validator/department.validator')

const router = express.Router()


router.route('/')
                .post(verifyToken,allowedTo(userRoles.ADMIN),createDepartmentValidator,addDepartment)

router.get('/:facultyId/departments',verifyToken,allowedTo(userRoles.ADMIN),getAllDepartments)
router.route('/:departmentId')
                            .get(verifyToken,allowedTo(userRoles.ADMIN),getDepartmentValidator,getDepartment)
                            .patch(verifyToken,allowedTo(userRoles.ADMIN),updateDepartmentValidator,updateDepartment)
                            .delete(verifyToken,allowedTo(userRoles.ADMIN),deleteDepartmentValidator,deletedepartment)



module.exports = router