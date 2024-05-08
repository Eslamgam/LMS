const asyncWrapper = require("../middelware/asyncWrapper");
const Department = require("../models/department.model");

const Faculty = require('../models/faculty.model');
const appError = require("../utils/appError");
const { v4: uuid } = require('uuid')

const httpStatusText = require('../utils/httpStatusText');
const validatorMiddelware = require("../middelware/validatorMiddelware");
const Course = require("../models/course.model");

exports.getAllCourses = asyncWrapper(
  async (req, res, next) => {
    const courses = await Course.findAll({
      where: { faculty_ID: req.params.facultyId },
      include: [{
        model: Faculty,
        attributes: ['faculty_name'],
      }],
    });
    if(courses.length==[0]){
      return next(appError.create('faculty id not found', 401, httpStatusText.FAIL))
    }
    return res.status(200).json({ status: httpStatusText.SUCCESS, data: { courses } })
  }
)


exports.addCourse = asyncWrapper(
  async (req, res, next) => {
    const { course_name, course_hours, image_path, faculty_ID } = req.body
    console.log("image=======", req.file);


    validatorMiddelware
    const course = await Course.findOne({

      where: { course_name, faculty_ID }
    });
    if (course) {
      return next(appError.create('course_name already exist', 401, httpStatusText.FAIL))
    }


    const newcourse = new Course({
      course_ID: uuid(),
      course_name,
      course_hours,
      image_path: req.file.path,
      faculty_ID
    })

    console.log("image=======", req.file.path);
    await newcourse.save();

    return res.status(200).json({ status: httpStatusText.SUCCESS, data: { newcourse } })
  }
)


exports.getCourse = asyncWrapper(
  async (req, res, next) => {
    // const id = req.params.courseId
    const course = await Course.findOne({
      where: { course_ID: req.params.courseId },
      include: [{
        model: Faculty,
        attributes: ['faculty_name'],
      }],
      
    });
    if (!course) {
      return next(appError.create('course does not exist', 404, httpStatusText.FAIL))
    }

    return res.status(200).json({ status: httpStatusText.SUCCESS, data: { course } })
  }
)



exports.updateCourse = asyncWrapper(
  async (req, res, next) => {
    const { course_name, course_hours, image_path } = req.body


    validatorMiddelware
    const id = req.params.courseId;
    const course = await Course.findOne({
      where: { course_ID: id }
    })
    if (!course) {
      return next(appError.create('course does not exist', 404, httpStatusText.FAIL))
    }

    const updatedcourse = await Course.update(
      { course_name: course_name, course_hours: course_hours, image_path: req.file.filename }, { where: { course_ID: id } }

    )
    console.log("image=======", req.file.filename);
    if (updatedcourse > 0) {
      return res.status(200).json({ status: httpStatusText.SUCCESS, message: `course with ID ${id} updated successfully` })
    } else {
      return next(appError.create('course does not exist', 401, httpStatusText.FAIL))
    }

  }
)


exports.deletecourse = asyncWrapper(
  async (req, res, next) => {

    const id = req.params.courseId;
    const course = await Course.findOne({
      where: { course_ID: id }
    })
    if (!course) {
      return next(appError.create('course does not exist', 401, httpStatusText.FAIL))
    }

    const deletedcourse = await Course.destroy(
      { where: { course_ID: id } }

    )

    if (deletedcourse > 0) {
      return res.status(200).json({ status: httpStatusText.SUCCESS, message: `course with ID ${id} deleted successfully` })
    } else {
      return next(appError.create('course does not exist', 401, httpStatusText.FAIL))
    }

  }
)

