const jwt = require('jsonwebtoken');

module.exports = async (req, res, next) => {

    const {JWT_SECRET: jwtKey, HEAD_AUTH_KEY: headerKey} = process.env;

    console.log(jwtKey, headerKey);
   
    const userToken = req.headers[headerKey];

    const decode = jwt.verify(userToken, jwtKey)

    console.log(decode);

    next()

}



