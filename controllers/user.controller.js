const asyncWrapper = require("../middelware/asyncWrapper");

const httpStatusText = require('../utils/httpStatusText');

const User = require('../models/user.model');

const Faculty = require("../models/faculty.model");

exports.getAllUsers = asyncWrapper(
  async (req, res, next) => {
    const users = await User.findAll({
      include: [{
        model: Faculty,
        attributes: ['faculty_name'],
      }],
    });


    return res.status(200).json({ status: httpStatusText.SUCCESS, data: { users } })
  }
)


