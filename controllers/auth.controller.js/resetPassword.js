const asyncWrapper = require("../../middelware/asyncWrapper")
const User = require("../../models/user.model")
const appError = require("../../utils/appError")

const httpStatusText = require('../../utils/httpStatusText');





exports.resetPassword =  asyncWrapper(
    async(req, res, next)=>{
        const {email, password,repassword} = req.body

        const user = User.findOne(
            {where: {email}}
        )

        if( repassword != password){
            return next(appError.create('password is not match', 400,httpStatusText.ERROR))
        }

        await User.update(
            {user_password: password},{where: {email}}
        )

        res.status(200).json({status: httpStatusText.SUCCESS})
    }
)