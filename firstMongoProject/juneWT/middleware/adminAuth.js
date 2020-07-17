const jwt = require('jsonwebtoken'); //using the JWT package
const apiKey = process.env.MOVIE_ADMIN; //not sure if we are using this
const User = require('../models/User'); //Using our Users model

// complete/update the adminAuth middle-ware that should allow call the next middle-ware if the user's isAdmin property is true. other than that it will be very similar to the user auth. 

// Simply set the request property 'adminId' to the admin's id and call next()
// test this out by making an admin user and a non admin user. Right now we dont have a way to promote a user to an admin but we did not include data sanitation for the adminProps so you would be able to set a user to admin via /user POST. Another way to set a user to an admin is by modifying the data directly in Atlas.

module.exports = async(req, res, next, adminLevel) => { //This is another way of defining our class Method to allow us to export it globally and use with our application.

    const { JWT_SECRET: jwtKey, HEAD_AUTH_KEY: headerKey} = process.env; //Here we use object destructuring to grab the values of different keys that we have stores in our .env file.

    const userToken = req.headers[headerKey]; //Definition of userToken, it is stored in our .env file, we stored it there from when we made a get request to our user/testAuth route and used our JWT.

    try { //our try catch block to verify that the userToken variable and jwtKey match in our database and then assign the return of that method to the const variable decodedData.

        const decodedData = jwt.verify(userToken, jwtKey);
        
        if (decodedData.id === undefined) { //Our conditional to test if the admin's ID is undefined and if it is, throw a new Error saying it is not defined.
            throw new Error('Id was not defined in the payload')
        }

        const admin = await User.findOne(
            {_id: decodedData.id}
        );

        if (admin === null) { throw new Error('User id is invalid');}
        

        const {_id: id, email: email, 'adminProps.isAdmin': isAdmin} = admin;

        const info = {
            id: id,
            email: email,
            isAdmin: isAdmin,
        }

        console.log(info)

    }  catch (err) {

        const errMsg = err.message || err;

        console.error(`\nError In AdminAuth: ${errMsg}\n`);

        return res.status(401).json({error: 'Not Authorized'})        
    }

}


function project () {

    User.findOne( { } );

}
























// module.exports = async(req, res, next) => {

//     const {

//         JWT_SECRET: jwtkey,
//         HEAD_AUTH_KEY: headerkey

//     } = process.env,    
//         token = req.headers[headerKey];

//     try {

//         const decodedData = jwt.verify(token, jwtkey);

//         if (decodedData.id === undefined) {

//             throw new Error("user ID not defined in the payload");

//         };

//         const user = await User.findOne({ "_id": decodedData.id });
//         isAdmin = user.admin.isAdmin;
        
//         if (!isAdmin) {
            
//             return res.status(401).json({
//                 status: 401,
//                 msg: "You are not authorized to access this page"
//             });

//         } else { next(); };
    
//     } catch (err) {

//         console.log("\n* UserAuth Error:", err.message || err, "*\n");

//         return res.status(401).json({
//             status: 401,
//             error: "Not Authorized"
//         });
//     };

// };
