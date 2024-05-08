const asyncWrapper = require("../middelware/asyncWrapper");
const Department = require("../models/department.model");

const Faculty = require('../models/faculty.model');
const appError = require("../utils/appError");
const { v4: uuid } = require('uuid')
const httpStatusText = require('../utils/httpStatusText');
const validatorMiddelware = require("../middelware/validatorMiddelware");
const Course = require("../models/course.model");
const New = require("../models/new.model");
const User = require("../models/user.model");
const University = require("../models/univer.model");
const Quiz = require("../models/quiz.model");
const CourseSemester = require("../models/courseSemester.model");




exports.addQuiz = asyncWrapper(
  async (req, res, next) => {
    const { quiz_title, quiz_notes, start_date, end_date, quiz_grade, course_cycle_ID } = req.body
    validatorMiddelware
    const newQuiz = await Quiz.create({
      quiz_ID: uuid(),
      quiz_title,
      quiz_notes,
      start_date,
      end_date,
      quiz_grade,
      course_cycle_ID,
      instructor_ID: req.currentUser.user_ID
    })

    return res.status(200).json({ status: httpStatusText.SUCCESS, data: { newQuiz } })
  }
)


exports.getQuiz = asyncWrapper(
  async (req, res, next) => {
    const id = req.params.quizId
    const quiz = await Quiz.findOne({
      where: { quiz_ID: id },
      include: [{
        model: CourseSemester,
        attributes: ['course_ID'],
        include: [
          {
            model: Course,
            attributes: ['course_name']
          }
        ]
      }, {
        model: User,
        attributes: ['full_name']
      }],
    });
    if (!quiz) {
      return next(appError.create('quiz does not exist', 404, httpStatusText.FAIL))
    }

    return res.status(200).json({ status: httpStatusText.SUCCESS, data: { quiz } })
  }
)





