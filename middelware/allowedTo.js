const appError = require("../utils/appError");
const httpStatusText = require('../utils/httpStatusText');

module.exports = (...role) => {    
    return (req, res, next) => {
        if(!role.includes(req.currentUser.user_role)) {
            return next(appError.create('this role is not authorized', 401, httpStatusText.ERROR))
        }
        next();
    }
}



