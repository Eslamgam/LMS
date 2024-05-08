const asyncWrapper = require("../middelware/asyncWrapper");
const User = require("../models/user.model");
const appError = require("../utils/appError");

const httpStatusText = require('../utils/httpStatusText');



exports.updateUserPaying = asyncWrapper(
    async(req, res, next)=>{
        const {email} = req.body

        const user = await User.findOne({
            where: {email}
        })

        if(!user){
            return next(appError.create(`this email ${email} not found `))
        }

        await User.update(
            {user_status: 'active'},{where: {email}}
        )

        res.status(200).json({status: httpStatusText.SUCCESS})
    }
)