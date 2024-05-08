
const connection = require('../../database/connection')
const httpStatusText = require('../../utils/httpStatusText');

const asyncWrapper = require("../../middelware/asyncWrapper");
const validatorMiddelware = require("../../middelware/validatorMiddelware");
const User = require("../../models/user.model");
const appError = require("../../utils/appError");



const { v4: uuid } = require('uuid')



exports.register = asyncWrapper(
    async (req, res, next) => {
      const { full_name, email, user_password, phone, image_path, faculty_ID, user_status, user_role } = req.body
      validatorMiddelware
  
      const user = await User.findOne({
        where: { email },
      });
      if (user) {
        return next(appError.create('user already exist', 401, httpStatusText.FAIL))
      }
  
      const newUser = new User({
        user_ID: uuid(), full_name, email, user_password, phone, image_path: req.file.filename, faculty_ID, user_status, user_role
      })
      await newUser.save()
      return res.status(200).json({ status: httpStatusText.SUCCESS, data: newUser })
    }
  )
  