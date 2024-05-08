const asyncWrapper = require("../middelware/asyncWrapper");

const Faculty = require('../models/faculty.model');
const appError = require("../utils/appError");
const { v4: uuid } = require('uuid')
const httpStatusText = require('../utils/httpStatusText');

const validatorMiddelware = require("../middelware/validatorMiddelware");
const { where } = require("sequelize");
const University = require("../models/univer.model");

exports.getAllFacultys = asyncWrapper(
  async (req, res, next) => {
    const Facultys = await Faculty.findAll({
        where: { university_ID: req.params.universityId },
        include: [{
          model: University,
          attributes: ['university_name']
        }]
      }
    
      
    );

    if(Facultys.length ==[0]){
      return next(appError.create('university id not found', 401, httpStatusText.FAIL))
    }
    return res.status(200).json({ status: httpStatusText.SUCCESS, data: { Facultys } })
  }
)


exports.addFaculty = asyncWrapper(
  async (req, res, next) => {
    const { university_ID, faculty_name, levels, Logo_path } = req.body
    console.log('req=========', req.file);
    validatorMiddelware
    const faculty = await Faculty.findOne({
      where: { university_ID, faculty_name }
    });
    if (faculty) {
      return next(appError.create('faculty already exist', 401, httpStatusText.FAIL))
    }

    const newFaculty = new Faculty({
      faculty_ID: uuid(),
      university_ID,
      faculty_name,
      levels,
      Logo_path: req.file.filename
    })
    await newFaculty.save()

    return res.status(200).json({ status: httpStatusText.SUCCESS, data: { newFaculty } })
  }
)


exports.getFaculty = asyncWrapper(
  async (req, res, next) => {
    const id = req.params.facultyId
    const faculty = await Faculty.findOne({
      where: { faculty_ID: id },
      include: [{
        model: University,
        attributes: ['university_name']
      }]
    });
    console.log('faculty====', faculty);
    // if(!faculty){
    //     return next(appError.create('faculty does not exist', 404, httpStatusText.FAIL))
    //   }

    return res.status(200).json({ status: httpStatusText.SUCCESS, data: { faculty } })
  }
)



exports.updateFaculty = asyncWrapper(
  async (req, res, next) => {
    const { faculty_name, levels, Logo_path } = req.body
    validatorMiddelware
    const id = req.params.facultyId;
    const faculty = await Faculty.findOne({
      where: { faculty_ID: id },
      

    })
    if (!faculty) {
      return next(appError.create('faculty does not exist', 401, httpStatusText.FAIL))
    }

    const updatedfaculty = await Faculty.update(
      { faculty_name: faculty_name, levels: levels, Logo_path: Logo_path, updatedAt: Date }, { where: { faculty_ID: id } }

    )
    if (updatedfaculty > 0) {
      return res.status(200).json({ status: httpStatusText.SUCCESS, message: `faculty with ID ${id} updated successfully` })
    } else {
      return next(appError.create('faculty does not exist', 401, httpStatusText.FAIL))
    }

  }
)


exports.deleteFaculty = asyncWrapper(
  async (req, res, next) => {

    const id = req.params.facultyId;
    const faculty = await Faculty.findOne({
      where: { faculty_ID: id }
    })
    if (!faculty) {
      return next(appError.create('faculty does not exist', 401, httpStatusText.FAIL))
    }

    const deletedfaculty = await Faculty.destroy(
      { where: { faculty_ID: id } }

    )

    if (deletedfaculty > 0) {
      return res.status(200).json({ status: httpStatusText.SUCCESS, message: `faculty with ID ${id} deleted successfully` })
    } else {
      return next(appError.create('faculty does not exist', 401, httpStatusText.FAIL))
    }

  }
)

