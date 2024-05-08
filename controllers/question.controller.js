const asyncWrapper = require("../middelware/asyncWrapper");

const Faculty = require('../models/faculty.model');
const appError = require("../utils/appError");

const httpStatusText = require('../utils/httpStatusText');
const { v4: uuid } = require('uuid')
const validatorMiddelware = require("../middelware/validatorMiddelware");
const CourseSemester = require("../models/courseSemester.model");
const Semester = require("../models/semester.model");
const Course = require("../models/course.model");
const Lecture = require("../models/lecture.model");
const Quiz = require("../models/quiz.model");
const Question = require("../models/question.model");

exports. getAllQuestion = asyncWrapper(
    async (req, res, next) => {
        const question = await Question.findAll({
          where: {quiz_ID:req.params.quizId}
        }
        );
        if(question.length === 0){
            return next(appError.create('quiz does not exist', 404, httpStatusText.FAIL))
        }
        return res.status(200).json({ status: httpStatusText.SUCCESS, data: { question } })
    }
)


exports. addQuestion = asyncWrapper(
    async (req, res, next) => {
        const {  quiz_ID, question_text, question_type, question_number, question_grade } = req.body
        validatorMiddelware
        const question = await Question.findOne({
            where: { question_text }
        });
        if (question) {
            return next(appError.create('question already exist', 401, httpStatusText.FAIL))
        }

        const newQuestion = await Question.create({
            question_ID:uuid(), quiz_ID, question_text, question_type, question_number, question_grade
        })

        return res.status(200).json({ status: httpStatusText.SUCCESS, data: { newQuestion } })
    }
)


exports. getQuestion = asyncWrapper(
    async (req, res, next) => {
        const id = req.params.questionId
        const question = await Question.findOne({
            where: { question_ID: id },
            include: [{
                model: Quiz,
                attributes: ['quiz_title', 'quiz_notes']
            }],
        });
        if (!question) {
            return next(appError.create('question does not exist', 404, httpStatusText.FAIL))
        }

        return res.status(200).json({ status: httpStatusText.SUCCESS, data: { question } })
    }
)



exports. updateQuestion = asyncWrapper(
    async (req, res, next) => {
        const { question_text, question_type, question_number, question_grade } = req.body
        validatorMiddelware
        const id = req.params.questionId;
        const question = await Question.findOne({
            where: { question_ID: id }
        })
        if (!question) {
            return next(appError.create('question does not exist', 401, httpStatusText.FAIL))
        }

        const updatedQuestion = await Question.update(
            { question_text: question_text, question_type: question_type, question_number: question_number, question_grade: question_grade, updatedAt: Date }, { where: { question_ID: id } }

        )
        if (updatedQuestion > 0) {
            return res.status(200).json({ status: httpStatusText.SUCCESS, message: `question with ID ${id} updated successfully` })
        } else {
            return next(appError.create('question does not exist', 401, httpStatusText.FAIL))
        }

    }
)


exports. deleteQuestion = asyncWrapper(
    async (req, res, next) => {

        const id = req.params.questionId;
        const question = await Question.findOne({
            where: { question_ID: id }
        })
        if (!question) {
            return next(appError.create('question does not exist', 401, httpStatusText.FAIL))
        }

        const deletedQuestion = await Question.destroy(
            { where: { question_ID: id } }

        )

        if (deletedQuestion > 0) {
            return res.status(200).json({ status: httpStatusText.SUCCESS, message: `Question with ID ${id} deleted successfully` })
        } else {
            return next(appError.create('Question does not exist', 401, httpStatusText.FAIL))
        }

    }
)

