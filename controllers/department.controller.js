const asyncWrapper = require("../middelware/asyncWrapper");
const Department = require("../models/department.model");
const { v4: uuid } = require('uuid')
const Faculty = require('../models/faculty.model');
const appError = require("../utils/appError");

const httpStatusText = require('../utils/httpStatusText');
const validatorMiddelware = require("../middelware/validatorMiddelware");


exports.getAllDepartments = asyncWrapper(
  async (req, res, next) => {
    const Departments = await Department.findAll({
      where: { faculty_ID: req.params.facultyId },
      include: [{
        model: Faculty,
        attributes: ['faculty_name'],
      }],
    });
    console.log("Departments====================", Departments);
    if (Departments.length==[0]) {
      return next(appError.create('faculty id not found', 401, httpStatusText.FAIL))
    }
    return res.status(200).json({ status: httpStatusText.SUCCESS, data: { Departments } })
  }
)


exports.addDepartment = asyncWrapper(
  async (req, res, next) => {
    const { faculty_ID, department_name } = req.body
    validatorMiddelware
    const department = await Department.findOne({
      where: { department_name }
    });
    if (department) {
      return next(appError.create('department already exist', 401, httpStatusText.FAIL))
    }

    const newdepartment = await Department.create({
      department_ID: uuid(), faculty_ID, department_name
    })

    return res.status(200).json({ status: httpStatusText.SUCCESS, data: { newdepartment } })
  }
)


exports.getDepartment = asyncWrapper(
  async (req, res, next) => {
    const id = req.params.departmentId
    const department = await Department.findOne({
      where: { department_ID: id },
      include: [{
        model: Faculty,
        attributes: ['faculty_name'],
      }],
    });
    if (!department) {
      return next(appError.create('department does not exist', 404, httpStatusText.FAIL))
    }

    return res.status(200).json({ status: httpStatusText.SUCCESS, data: { department } })
  }
)



exports.updateDepartment = asyncWrapper(
  async (req, res, next) => {
    const { department_name } = req.body
    validatorMiddelware
    const id = req.params.departmentId;
    const department = await Department.findOne({
      where: { department_ID: id }
    })
    if (!department) {
      return next(appError.create('department does not exist', 401, httpStatusText.FAIL))
    }

    const updateddepartment = await Department.update(
      { department_name: department_name, updatedAt: Date }, { where: { department_ID: id } }

    )
    if (updateddepartment > 0) {
      return res.status(200).json({ status: httpStatusText.SUCCESS, message: `department with ID ${id} updated successfully` })
    } else {
      return next(appError.create('department does not exist', 401, httpStatusText.FAIL))
    }

  }
)


exports.deletedepartment = asyncWrapper(
  async (req, res, next) => {

    const id = req.params.departmentId;
    const department = await Department.findOne({
      where: { department_ID: id }
    })
    if (!department) {
      return next(appError.create('department does not exist', 401, httpStatusText.FAIL))
    }

    const deleteddepartment = await Department.destroy(
      { where: { department_ID: id } }

    )

    if (deleteddepartment > 0) {
      return res.status(200).json({ status: httpStatusText.SUCCESS, message: `department with ID ${id} deleted successfully` })
    } else {
      return next(appError.create('department does not exist', 401, httpStatusText.FAIL))
    }

  }
)

