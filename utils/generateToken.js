const jwt = require('jsonwebtoken');

module.exports = async (payload) => {

    const token = await jwt.sign(
        payload,
        process.env.SECRET_KEY_TOKEN,
   
    );

    return token;
}