const { where } = require("sequelize");
const asyncWrapper = require("../middelware/asyncWrapper");

const University = require('../models/univer.model');
const appError = require("../utils/appError");
const { v4: uuid } = require('uuid')
const httpStatusText = require('../utils/httpStatusText');
const validatorMiddelware = require("../middelware/validatorMiddelware");


exports. getAllUniversity = asyncWrapper(
  async (req, res, next) => {


    const universitys = await University.findAll();

    return res.status(200).json({ status: httpStatusText.SUCCESS, data: { universitys } })

  }
)


exports. addUniversity = asyncWrapper(
  async (req, res, next) => {
    const { university_name, Logo_path } = req.body
    validatorMiddelware
    const university = await University.findOne({
      where: { university_name }
    });
    if (university) {
      return next(appError.create('university already exist', 401, httpStatusText.FAIL))
    }

    const newUniversity = new University({
      university_ID: uuid(), university_name, Logo_path: req.file.filename
    })
    await newUniversity.save()

    return res.status(200).json({ status: httpStatusText.SUCCESS, data: { newUniversity } })

  }
)

exports. getOneUniversity = asyncWrapper(
  async (req, res, next) => {
    const id = req.params.universityId;
    const university = await University.findOne({
      where: { university_ID: id }
    })

    if (!university) {
      return next(appError.create('university does not exist', 401, httpStatusText.FAIL))
    }

    return res.status(200).json({ status: httpStatusText.SUCCESS, data: { university } })



  }
)



exports. updateUniversity = asyncWrapper(
  async (req, res, next) => {
    const { university_name, Logo_path } = req.body
    validatorMiddelware
    const id = req.params.universityId;
    const university = await University.findOne({
      where: { university_ID: id }
    })
    if (!university) {
      return next(appError.create('university does not exist', 401, httpStatusText.FAIL))
    }

    const updatedUniversity = await University.update(
      { university_name: university_name, Logo_path: req.file.filename, updatedAt: Date }, { where: { university_ID: id } }

    )

    if (updatedUniversity > 0) {
      return res.status(200).json({ status: httpStatusText.SUCCESS, message: `university with ID ${id} updated successfully` })
    } else {
      return next(appError.create('university does not exist', 401, httpStatusText.FAIL))
    }




  }
)

exports. deletedUniversity = asyncWrapper(
  async (req, res, next) => {
    const id = req.params.universityId;
    const university = await University.findOne({
      where: { university_ID: id }
    })
    if (!university) {
      return next(appError.create('university does not exist', 401, httpStatusText.FAIL))
    }

    const deleteUniversity = await University.destroy({
      where: { university_ID: id }
    })

    if (deleteUniversity > 0) {
      return res.status(200).json({ status: httpStatusText.SUCCESS, message: `University with ID ${id} deleted successfully` })
    } else {
      return next(appError.create('university does not exist', 401, httpStatusText.FAIL))
    }




  }
)





