const asyncWrapper = require("../middelware/asyncWrapper");

const Faculty = require('../models/faculty.model');
const appError = require("../utils/appError");

const httpStatusText = require('../utils/httpStatusText');
const { v4: uuid } = require('uuid')
const validatorMiddelware = require("../middelware/validatorMiddelware");
const StudentInformation = require("../models/studentInformation.model");
const User = require("../models/user.model");
const Department = require("../models/department.model");

exports. getAllStudentsInformation = asyncWrapper(
    async (req, res, next) => {
        const students = await StudentInformation.findAll({
            where: { department_ID: req.params.departmentId },
            include: [{
                model: User, 
                attributes: ['full_name', 'email'], 
            },
            {
                model: Department,
                attributes: ['department_name']
            }
            ],
        });
        if(students.length==[0]){
            return next(appError.create('department id not found', 401, httpStatusText.FAIL))
        }
        return res.status(200).json({ status: httpStatusText.SUCCESS, data: { students } })
    }
)


exports. addStudentsInformation = asyncWrapper(
    async (req, res, next) => {
        const { academic_ID, user_ID, department_ID, student_level } = req.body
        validatorMiddelware

        

        const newStudentsInformation = await StudentInformation.create({
            academic_ID, user_ID, department_ID, student_level
        })

        return res.status(200).json({ status: httpStatusText.SUCCESS, data: { newStudentsInformation } })
    }
)


exports. getOneStudentInformation = asyncWrapper(
    async (req, res, next) => {
        // const id = req.params.academicId
        const student = await StudentInformation.findOne({
            where: { academic_ID: req.params.academicId },
            include: [{
                model: User, 
                attributes: ['full_name', 'email', 'phone'], 
            },
            {
                model: Department,
                attributes: ['department_name']
            }
            ],
        });
        if (!student) {
            return next(appError.create('student does not exist', 404, httpStatusText.FAIL))
        }

        return res.status(200).json({ status: httpStatusText.SUCCESS, data: { student } })
    }
)



exports. updateStudentInformation = asyncWrapper(
    async (req, res, next) => {
        const { student_level } = req.body
        validatorMiddelware
        const id = req.params.academicId;
        const student = await StudentInformation.findOne({
            where: { academic_ID: id }
        })
        console.log('student==========', student);
        if (!student) {
            return next(appError.create('student does not exist', 404, httpStatusText.FAIL))
        }

        const updatedstudent = await StudentInformation.update(
            { student_level: student_level , updatedAt: Date}, { where: { academic_ID: id } }

        )
        if (updatedstudent > 0) {
            return res.status(200).json({ status: httpStatusText.SUCCESS, message: `student with ID ${id} updated successfully` })
        } else {
            return next(appError.create('student does not exist', 401, httpStatusText.FAIL))
        }

    }
)


exports. deleteStudentInformation= asyncWrapper(
    async(req, res,next)=>{

        const id = req.params.academicId;
        const student = await StudentInformation.findOne({
            where: {academic_ID:id}
        })
        if(!student){
            return next(appError.create('faculty does not exist', 401, httpStatusText.FAIL))
          }

          const deletedstudent = await StudentInformation.destroy(
           {where: {academic_ID: id}}

          )

          if(deletedstudent>0){
            return res.status(200).json({status: httpStatusText.SUCCESS, message: `student with ID ${id} deleted successfully`})
          }else{
            return next(appError.create('student does not exist', 401, httpStatusText.FAIL))
          }

    }
)

