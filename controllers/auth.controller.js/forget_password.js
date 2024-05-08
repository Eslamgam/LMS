const asyncWrapper = require("../../middelware/asyncWrapper");
const User = require("../../models/user.model");
const appError = require("../../utils/appError");

const httpStatusText = require('../../utils/httpStatusText');
const { generateRandomFourDigitNumber } = require("./sendEmail/generateRandomCode");
const sendEmailWithNaodeMailer = require("./sendEmail/sendEmailCode");



exports.forgetPassword = asyncWrapper(
    async(req, res, next)=>{
        const {email} = req.body
        const user = await User.findOne({
            where: {email}
        })
        if(!user){
            return next(appError.create('this email not found', 404, httpStatusText.ERROR))
        }
        const number = generateRandomFourDigitNumber()
        sendEmailWithNaodeMailer(email,number,user.full_name )
        await User.update(
            {verfiyCode: number},{where: {email}}
        )
        res.status(200).json({status: httpStatusText.SUCCESS, code: number})
    }
)