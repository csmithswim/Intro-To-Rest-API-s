const jwt = require('jsonwebtoken');

const User = require('../models/User');

module.exports = async (req, res, next) => {

    const {JWT_SECRET: jwtKey} = process.env;

    const userToken = req.authKey;

    try {

        const decodedData = jwt.verify(userToken, jwtKey);

        if (decodedData.id === undefined && decodedData.id.length != 24 ) { 
            
            throw new Error('Id was not defined in the payload or the length was invalid');
        }

        const query = {_id: decodedData.id};

        const projection = {password: 0, adminProp: 0, __v: 0};

        const user = await User.findOne(query, projection);

        if (user === null) {

            throw new Error('User no longer in database')
        }

        console.log(user);

        req.user = user;

        next()

    } catch (err) {

        const errMsg = err.message || err;

        console.log(`\nError in UserAuth: ${errMsg}\n`);

        return res.status(401).json({error: 'Not Authorized'})
    }

    // console.log(decode);


}



