const asyncWrapper = require("../middelware/asyncWrapper");

const appError = require("../utils/appError");
const { v4: uuid } = require('uuid')
const httpStatusText = require('../utils/httpStatusText');
const validatorMiddelware = require("../middelware/validatorMiddelware");
const Course = require("../models/course.model");
const InstructorCourseSemester = require("../models/instructorCourseSemester.model");
const User = require("../models/user.model");
const CourseSemester = require("../models/courseSemester.model");
const Semester = require("../models/semester.model");
const Task = require("../models/task.model");
const TaskAnswer = require("../models/taskAnswer.model");



exports. addTaskAnswer = asyncWrapper(
    async (req, res, next) => {
        const {  task_ID,  student_ID , file_path , task_answer_status,  task_answer_grade} = req.body
        validatorMiddelware
        const newTaskAnswer = await TaskAnswer.create({
            answer_ID :uuid(), task_ID,  student_ID , file_path:req.file.filename , task_answer_status,  task_answer_grade
        })
        await newTaskAnswer.save()

        return res.status(200).json({ status: httpStatusText.SUCCESS, data: { newTaskAnswer } })
    }
)




exports. getTaskAnswer = asyncWrapper(
    async (req, res, next) => {
        const id = req.params.taskAnswerId
        const task = await TaskAnswer.findOne({
            where: { answer_ID: id },
            include: [{
                model: User,
                attributes: ['full_name','user_ID']
            }, {
                model: Task,
                attributes: ['task_title'],
               

            }],

        });
        if (!task) {
            return next(appError.create('task does not exist', 404, httpStatusText.FAIL))
        }

        return res.status(200).json({ status: httpStatusText.SUCCESS, data: { task } })
    }
)








