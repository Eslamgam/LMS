const asyncWrapper = require("../middelware/asyncWrapper");

const Faculty = require('../models/faculty.model');
const appError = require("../utils/appError");

const httpStatusText = require('../utils/httpStatusText');
const validatorMiddelware = require("../middelware/validatorMiddelware");
const Semester = require("../models/semester.model");
const { v4: uuid } = require('uuid')


exports. getAllSemester = asyncWrapper(
  async (req, res, next) => {
    const semester = await Semester.findAll({
      where:{faculty_ID: req.params.facultyId},
      include: [{
        model: Faculty,
        attributes: ['faculty_name'],
      }],
    });
    if(semester.length==[0]){
      return next(appError.create('faculty id not found', 401, httpStatusText.FAIL))
    }
    return res.status(200).json({ status: httpStatusText.SUCCESS, data: { semester } })
  }
)

exports. addsemester = asyncWrapper(
  async (req, res, next) => {
    const { faculty_ID, start_Date, end_Date, years, semester_number } = req.body
    validatorMiddelware
    const newsemester = await Semester.create({
      semester_ID: uuid(), faculty_ID, start_Date, end_Date, years, semester_number
    })

    return res.status(200).json({ status: httpStatusText.SUCCESS, data: { newsemester } })
  }
)


exports. getsemester = asyncWrapper(
  async (req, res, next) => {
    const id = req.params.semesterId
    const semester = await Semester.findOne({
      where: { semester_ID: id },
      include: [{
        model: Faculty,
        attributes: ['faculty_name'],
      }],

    });
    if (!semester) {
      return next(appError.create('semester does not exist', 404, httpStatusText.FAIL))
    }

    return res.status(200).json({ status: httpStatusText.SUCCESS, data: { semester } })
  }
)



exports. updatesemester = asyncWrapper(
  async (req, res, next) => {
    const { start_Date, end_Date, years, semester_number } = req.body
    validatorMiddelware
    const id = req.params.semesterId;
    const semester = await Semester.findOne({
      where: { semester_ID: id }
    })
    if (!semester) {
      return next(appError.create('semester does not exist', 404, httpStatusText.FAIL))
    }

    const updatedsemester = await Semester.update(
      { start_Date, end_Date, years, semester_number, updatedAt: Date }, { where: { semester_ID: id } }

    )
    if (updatedsemester > 0) {
      return res.status(200).json({ status: httpStatusText.SUCCESS, message: `Semester with ID ${id} updated successfully` })
    } else {
      return next(appError.create('Semester does not exist', 401, httpStatusText.FAIL))
    }

  }
)


exports. deleteSemester = asyncWrapper(
  async (req, res, next) => {

    const id = req.params.semesterId;
    const semester = await Semester.findOne({
      where: { semester_ID: id }
    })
    if (!semester) {
      return next(appError.create('semester does not exist', 404, httpStatusText.FAIL))
    }

    const deletedsemester = await Semester.destroy(
      { where: { semester_ID: id } }

    )

    if (deletedsemester > 0) {
      return res.status(200).json({ status: httpStatusText.SUCCESS, message: `semester with ID ${id} deleted successfully` })
    } else {
      return next(appError.create('semester does not exist', 401, httpStatusText.FAIL))
    }

  }
)

