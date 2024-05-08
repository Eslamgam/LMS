const asyncWrapper = require("../middelware/asyncWrapper");

const appError = require("../utils/appError");
const { v4: uuid } = require('uuid')
const httpStatusText = require('../utils/httpStatusText');
const validatorMiddelware = require("../middelware/validatorMiddelware");
const CourseSemester = require("../models/courseSemester.model");
const Course = require("../models/course.model");

exports. getAllCourseSemesters = asyncWrapper(
    async(req, res, next)=>{
        const courseSemesters  = await CourseSemester.findAll({
            where: { semester_ID: req.params.semesterId },
            include: [
                {
              model: Course,  
              attributes: ['course_name','course_hours'], 
            },
           
        
        ],
          });

          if(courseSemesters.length==[0]){
            return next(appError.create('semester id not found', 401, httpStatusText.FAIL))
          }
        return res.status(200).json({status: httpStatusText.SUCCESS, data: {courseSemesters}})
    }
)


exports. addCourseSemester = asyncWrapper(
    async(req, res, next)=>{
        const {  semester_ID, course_ID} = req.body
        validatorMiddelware
        const courseSemester = await CourseSemester.findOne({
            where: {course_ID}
        });
        if(courseSemester){
            return next(appError.create('course already exist in course semester', 401, httpStatusText.FAIL))
          }

          const newcourseSemester = await CourseSemester.create({
            cycle_ID:uuid(),  semester_ID, course_ID
          })

        return res.status(200).json({status: httpStatusText.SUCCESS, data: {newcourseSemester}})
    }
)


exports. getcourseSemester = asyncWrapper(
    async(req, res, next)=>{
       const id = req.params.courseSemesterId
        const courseSemester = await CourseSemester.findOne({
            where: {cycle_ID:id},
            include: [{
                model: Course,   
                attributes: ['course_name','course_hours','image_path'], 
              },
           
          ],

        });
        if(!courseSemester){
            return next(appError.create('courseSemester does not exist', 404, httpStatusText.FAIL))
          }

        return res.status(200).json({status: httpStatusText.SUCCESS, data: {courseSemester}})
    }
)






exports. deletecourseSemester = asyncWrapper(
    async(req, res,next)=>{
      
        const id = req.params.courseSemesterId;
        const courseSemester = await CourseSemester.findOne({
            where: {cycle_ID:id}
        })
        if(!courseSemester){
            return next(appError.create('courseSemester does not exist', 401, httpStatusText.FAIL))
          }

          const deletedcourseSemester = await CourseSemester.destroy(
           {where: {cycle_ID: id}}
        
          )

          if(deletedcourseSemester>0){
            return res.status(200).json({status: httpStatusText.SUCCESS, message: `courseSemester with ID ${id} deleted successfully`})
          }else{
            return next(appError.create('courseSemester does not exist', 401, httpStatusText.FAIL))
          }

    }
)

