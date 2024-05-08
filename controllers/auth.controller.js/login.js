
const httpStatusText = require('../../utils/httpStatusText');
const asyncWrapper = require("../../middelware/asyncWrapper");
const validatorMiddelware = require("../../middelware/validatorMiddelware");
const User = require("../../models/user.model");
const appError = require("../../utils/appError");
const generateToken = require("../../utils/generateToken");






exports.login = asyncWrapper(
    async (req, res, next) => {
      const { email, user_password } = req.body
      validatorMiddelware
      const user = await User.findOne({
        where: { email },
      });
      if (!user) {
        return next(appError.create('email not found', 404, httpStatusText.ERROR))
      }
  
      if (user_password != user.user_password) {
        return next(appError.create('password incorrect', 400, httpStatusText.ERROR))
      }
  
      const token = await generateToken({ user_ID: user.user_ID,user_status: user.user_status, user_role: user.user_role})  
  
      if (user.user_status != 'active') {
        return next(appError.create('this user must be pay the mony first', 400, httpStatusText.ERROR))
  
      }
  
  
      return res.status(200).json({ status: httpStatusText.SUCCESS, data: { token } })
    }
  )

