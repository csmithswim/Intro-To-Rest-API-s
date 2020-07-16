// const jwt = 
const apiKey = process.env.MOVIE_ADMIN;
const User = require('../models/User');

// complete/update the adminAuth middle-ware that should allow call the next middle-ware if the user's isAdmin property is true. other than that it will be very similar to the user auth. 

// Simply set the request property 'adminId' to the admin's id and call next()
// test this out by making an admin user and a non admin user. Right now we dont have a way to promote a user to an admin but we did not include data sanitation for the adminProps so you would be able to set a user to admin via /user POST. Another way to set a user to an admin is by modifying the data directly in Atlas.
// (also remember we use it in the homeRouter.js so youll want to update how that is used on the '/mrental/admin' router)2.  Complete the algorithm listed below as a CLI3. When the above items are complete I would like you to attempt to make a patch route that will only need to be used once (ideally).
// This may require you to go to mongodb's documentation but I will be willing to give hints if you ask me.
// it should be a movie route that will update all movie documents whoes 'inventory.rented' is equal to 0 to now equal an empty array.

function adminAuth(req, res, next){

    const user = User.findOne({_id: payload.id})
    next()
}

module.exports = adminAuth;