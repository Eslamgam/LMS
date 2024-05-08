const asyncWrapper = require("../middelware/asyncWrapper");
const Department = require("../models/department.model");

const Faculty = require('../models/faculty.model');
const appError = require("../utils/appError");
const { v4: uuid } = require('uuid')
const httpStatusText = require('../utils/httpStatusText');
const validatorMiddelware = require("../middelware/validatorMiddelware");
const Course = require("../models/course.model");
const InstructorCourseSemester = require("../models/instructorCourseSemester.model");
const User = require("../models/user.model");
const CourseSemester = require("../models/courseSemester.model");
const Semester = require("../models/semester.model");
const StudentEnrollment = require("../models/studentEnrollment.model");

exports. getAllStudentEnrollment = asyncWrapper(
    async(req, res, next)=>{
        const studentEnrollment = await StudentEnrollment.findAll({
            where:{student_ID: req.params.studentId},
            include: [{
              model: User,
              attributes: ['full_name','user_role']
            },{
                model: CourseSemester,
                include:[
                    {
                        model:Semester,
                        attributes: ['start_Date', 'end_Date']
                    },
                    {
                        model:Course,
                        attributes:['course_name' ,'course_hours']
                    }
                ]
                
            }],
          });
        return res.status(200).json({status: httpStatusText.SUCCESS, data: {studentEnrollment}})
    }
)


exports. addStudentEnrollment = asyncWrapper(
    async(req, res, next)=>{
        const {student_ID ,course_cycle_ID} = req.body
        validatorMiddelware
          const studentEnrollment= await StudentEnrollment.create({
            student_ID ,course_cycle_ID
          })

        return res.status(200).json({status: httpStatusText.SUCCESS, data: {studentEnrollment}})
    }
)


exports. getStudentEnrollment = asyncWrapper(
    async(req, res, next)=>{
       const id = req.params.studentId
        const studentEnrollment = await StudentEnrollment.findOne({
            where: {student_ID:id},
            include: [{
                model: User,
                attributes: ['full_name',  'email',  'phone',  'user_status',  'user_role']
              },{
                  model: CourseSemester,
                  include:[
                      {
                          model:Semester,
                          attributes: ['start_Date', 'end_Date']
                      },
                      {
                          model:Course,
                          attributes:['course_name' ,'course_hours']
                      }
                  ]
                  
              }],

        });
        if(!studentEnrollment){
            return next(appError.create('studentEnrollment does not exist', 404, httpStatusText.FAIL))
          }

        return res.status(200).json({status: httpStatusText.SUCCESS, data: {studentEnrollment}})
    }
)




exports. deleteStudentEnrollment = asyncWrapper(
    async(req, res,next)=>{
      
        const id = req.params.studentId;
        const studentEnrollment = await StudentEnrollment.findOne({
            where: {student_ID:id}
        })
        if(!studentEnrollment){
            return next(appError.create('studentEnrollment does not exist', 401, httpStatusText.FAIL))
          }

          const deletedstudentEnrollment = await StudentEnrollment.destroy(
           {where: {student_ID: id}}
        
          )

          if(deletedstudentEnrollment>0){
            return res.status(200).json({status: httpStatusText.SUCCESS, message: `studentEnrollment with ID ${id} deleted successfully`})
          }else{
            return next(appError.create('studentEnrollment does not exist', 401, httpStatusText.FAIL))
          }

    }
)

