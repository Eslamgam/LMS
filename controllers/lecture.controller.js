const asyncWrapper = require("../middelware/asyncWrapper");

const Faculty = require('../models/faculty.model');
const appError = require("../utils/appError");
const { v4: uuid } = require('uuid')
const httpStatusText = require('../utils/httpStatusText');

const validatorMiddelware = require("../middelware/validatorMiddelware");
const CourseSemester = require("../models/courseSemester.model");
const Course = require("../models/course.model");
const Lecture = require("../models/lecture.model");

exports. getAllLectures = asyncWrapper(
    async (req, res, next) => {
        const lectures = await Lecture.findAll(

            {
             where:{course_cycle_ID:req.params.courseCycleId}
            }
        );
        if(lectures.length === 0) {
            return next(appError.create('lectures does not exist', 404, httpStatusText.FAIL))
        }
        return res.status(200).json({ status: httpStatusText.SUCCESS, data: { lectures } })
    }
)


exports. addLecture = asyncWrapper(
    async (req, res, next) => {
        const { course_cycle_ID , lecture_title,  lecture_type} = req.body
        validatorMiddelware
        const lecture = await Lecture.findOne({
            where: { lecture_title }
        });
        if (lecture) {
            return next(appError.create('lecture already exist', 401, httpStatusText.FAIL))
        }

        const newlecture = await Lecture.create({
            lecture_ID:uuid() ,course_cycle_ID , lecture_title,  lecture_type
        })

        return res.status(200).json({ status: httpStatusText.SUCCESS, data: { newlecture } })
    }
)



exports. getLecture = asyncWrapper(
    async (req, res, next) => {
        const id = req.params.lectureId
        const lecture = await Lecture.findOne({
            where: { lecture_ID: id },
            include: [{
                model: CourseSemester,
                attributes:['cycle_ID'],
                include: [
                    {
                        model: Course,
                        attributes: ['course_hours']
                    }
                ]
            }],
        });
        if (!lecture) {
            return next(appError.create('lecture does not exist', 404, httpStatusText.FAIL))
        }

        return res.status(200).json({ status: httpStatusText.SUCCESS, data: { lecture } })
    }
)



exports. updateLecture = asyncWrapper(
    async (req, res, next) => {
        const {  lecture_title,  lecture_type} = req.body
        validatorMiddelware
        const id = req.params.lectureId;
        const lecture = await Lecture.findOne({
            where: { lecture_ID: id }
        })
        if (!lecture) {
            return next(appError.create('lecture does not exist', 401, httpStatusText.FAIL))
        }

        const updatedLecture = await Lecture.update(
            { lecture_title: lecture_title, lecture_type: lecture_type, updatedAt: Date }, { where: { lecture_ID: id } }

        )
        if (updatedLecture > 0) {
            return res.status(200).json({ status: httpStatusText.SUCCESS, message: `lecture with ID ${id} updated successfully` })
        } else {
            return next(appError.create('lecture does not exist', 401, httpStatusText.FAIL))
        }

    }
)


exports. deleteLecture = asyncWrapper(
    async (req, res, next) => {

        const id = req.params.lectureId;
        const lecture = await Lecture.findOne({
            where: { lecture_ID: id }
        })
        if (!lecture) {
            return next(appError.create('lecture does not exist', 401, httpStatusText.FAIL))
        }

        const deletedLecture = await Lecture.destroy(
            { where: { lecture_ID: id } }

        )

        if (deletedLecture > 0) {
            return res.status(200).json({ status: httpStatusText.SUCCESS, message: `lecture with ID ${id} deleted successfully` })
        } else {
            return next(appError.create('lecture does not exist', 401, httpStatusText.FAIL))
        }

    }
)

