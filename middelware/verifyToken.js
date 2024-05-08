const jwt = require('jsonwebtoken');
const httpStatusText = require('../utils/httpStatusText');
const appError = require('../utils/appError');
const User = require('../models/user.model');

const verifyToken = async (req, res, next) => {
    const authHeader = req.headers['Authorization'] || req.headers['authorization'];
    if (!authHeader) {
        const error = appError.create('token is required', 401, httpStatusText.ERROR)
        return next(error);
    }

    const token = authHeader.split(' ')[1];
    try {

        const currentUser = jwt.verify(token, process.env.SECRET_KEY_TOKEN);
        console.log('currentUser====', currentUser);
        const user = await User.findOne({
            where: { user_ID: currentUser.user_ID },
        });
        if(user.user_status != 'active'){
            return next(appError.create('user account is no active', 400, httpStatusText.ERROR))
        }
        req.currentUser = user;
        console.log('currentUser====', currentUser);


        next();

    } catch (err) {
        const error = appError.create('invalid token', 401, httpStatusText.ERROR)
        console.log('errors==========', err);
        return next(error);
    }

}

module.exports = verifyToken;