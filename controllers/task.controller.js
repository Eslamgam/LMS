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

exports. getAllTasks = asyncWrapper(
    async (req, res, next) => {
        const task = await Task.findAll({
            where:{course_cycle_ID: req.params.courseCycleId},
            include: [{
                 
                model: CourseSemester,
                attributes: ['course_ID'],
                include: [
                    {
                        model: Course,
                        attributes: ['course_name']
                    }
                ]

            }],
        });
        if(task.length === 0){
            return next(appError.create('task does not exist', 404, httpStatusText.FAIL))
        }
        return res.status(200).json({ status: httpStatusText.SUCCESS, data: { task } })
    }
)


exports. addTask = asyncWrapper(
    async (req, res, next) => {
        const {  task_title, start_date, end_date, task_grade, file_path, course_cycle_ID, instructor_ID } = req.body
        validatorMiddelware
        const newTask = await Task.create({
            task_ID:uuid(), task_title, start_date, end_date, task_grade, file_path:req.file.filename, course_cycle_ID, instructor_ID
        })
        await newTask.save()

        return res.status(200).json({ status: httpStatusText.SUCCESS, data: { newTask } })
    }
)


exports. getTask = asyncWrapper(
    async (req, res, next) => {
        const id = req.params.taskId
        const task = await Task.findOne({
            where: { task_ID: id },
            include: [{
                model: User,
                attributes: ['full_name']
            }, {
                model: CourseSemester,
                attributes: ['course_ID'],
                include: [
                    {
                        model: Course,
                        attributes: ['course_name', 'course_hours']
                    }
                ]

            }],

        });
        if (!task) {
            return next(appError.create('task does not exist', 404, httpStatusText.FAIL))
        }

        return res.status(200).json({ status: httpStatusText.SUCCESS, data: { task } })
    }
)



exports. updateTask = asyncWrapper(
    async (req, res, next) => {
        const { task_title, start_date, end_date, task_grade, file_path } = req.body
        validatorMiddelware
        const id = req.params.taskId;
        const task = await Task.findOne({
            where: { task_ID: id }
        })
        if (!task) {
            return next(appError.create('task does not exist', 404, httpStatusText.FAIL))
        }

        const updatedTask = await Task.update(
            { task_title: task_title, start_date: start_date, end_date: end_date, task_grade: task_grade, file_path: file_path, updatedAt: Date }, { where: { task_ID: id } }

        )
        if (updatedTask > 0) {
            return res.status(200).json({ status: httpStatusText.SUCCESS, message: `task with ID ${id} updated successfully` })
        } else {
            return next(appError.create('task does not exist', 401, httpStatusText.FAIL))
        }

    }
)


exports. deleteTask = asyncWrapper(
    async (req, res, next) => {

        const id = req.params.taskId;
        const task = await Task.findOne({
            where: { task_ID: id }
        })
        if (!task) {
            return next(appError.create('task does not exist', 401, httpStatusText.FAIL))
        }

        const deletedTask = await Task.destroy(
            { where: { task_ID: id } }

        )

        if (deletedTask > 0) {
            return res.status(200).json({ status: httpStatusText.SUCCESS, message: `task with ID ${id} deleted successfully` })
        } else {
            return next(appError.create('task does not exist', 401, httpStatusText.FAIL))
        }

    }
)

