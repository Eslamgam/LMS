const asyncWrapper = require("../../middelware/asyncWrapper");
const User = require("../../models/user.model");
const appError = require("../../utils/appError");


const httpStatusText = require('../../utils/httpStatusText');




exports.verfiyStatusCode = asyncWrapper(
    async(req, res, next)=>{
        const {email, code} = req.body

        const user = await User.findOne(
            {where: {email}}
        )

        if(user.verfiyCode != code){
            return next(appError.create('code is not match', 400,httpStatusText.ERROR))
        }

        res.status(200).json({status: httpStatusText.SUCCESS})
    }
)