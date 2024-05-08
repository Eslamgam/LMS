const asyncWrapper = require("../middelware/asyncWrapper");
const Department = require("../models/department.model");

const appError = require("../utils/appError");
const { v4: uuid } = require('uuid')
const httpStatusText = require('../utils/httpStatusText');
const validatorMiddelware = require("../middelware/validatorMiddelware");
const Course = require("../models/course.model");
const InstructorCourseSemester = require("../models/instructorCourseSemester.model");
const User = require("../models/user.model");
const CourseSemester = require("../models/courseSemester.model");
const Semester = require("../models/semester.model");
exports. getAllInstructorCourseSemester = asyncWrapper(
    async(req, res, next)=>{
        const instructorCourseSemesters = await InstructorCourseSemester.findAll({
            where: {instructor_ID:req.params.instructorId},
            include: [{
              model: User,
              attributes: ['full_name',  'email']
            },{
                model: CourseSemester,
                attributes: ['cycle_ID'],
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
        return res.status(200).json({status: httpStatusText.SUCCESS, data: {instructorCourseSemesters}})
    }
)


exports. addInstructorCourseSemester = asyncWrapper(
    async(req, res, next)=>{
        const {instructor_ID ,course_cycle_ID} = req.body
        validatorMiddelware
          const newInstructorCourseSemester= await InstructorCourseSemester.create({
            instructor_ID ,course_cycle_ID
          })

        return res.status(200).json({status: httpStatusText.SUCCESS, data: {newInstructorCourseSemester}})
    }
)


exports. getInstructorCourseSemester = asyncWrapper(
    async(req, res, next)=>{
    //    const id = req.params.courseId
        const instructorCourseSemester = await InstructorCourseSemester.findOne({
            where: {instructor_ID :req.params.instrctorId},
            include: [{
                model: User,
                attributes: ['full_name',  'email',  'phone','user_role']
              },{
                  model: CourseSemester,
                  attributes: ['cycle_ID'],
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
        if(!instructorCourseSemester){
            return next(appError.create('instructorCourse does not exist', 404, httpStatusText.FAIL))
          }

        return res.status(200).json({status: httpStatusText.SUCCESS, data: {instructorCourseSemester}})
    }
)




exports. deleteInstructorCourseSemester = asyncWrapper(
    async(req, res,next)=>{
      
        const id = req.params.instructorCourseSemesterId;
        const instructorCourseSemester = await InstructorCourseSemester.findOne({
            where: {instructor_ID:id}
        })
        if(!instructorCourseSemester){
            return next(appError.create('instructorCourseSemester does not exist', 401, httpStatusText.FAIL))
          }

          const deletedinstructorCourseSemester = await InstructorCourseSemester.destroy(
           {where: {instructor_ID: id}}
        
          )

          if(deletedinstructorCourseSemester>0){
            return res.status(200).json({status: httpStatusText.SUCCESS, message: `instructorCourseSemester with ID ${id} deleted successfully`})
          }else{
            return next(appError.create('instructorCourseSemester does not exist', 401, httpStatusText.FAIL))
          }

    }
)

