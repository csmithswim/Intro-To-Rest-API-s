const User = require("../models/User")
const express = require("express");
const router = express.Router();
const validator = require("validator");

const validateUser = require('../middleware/validateUser');




//Post route for users
//localhost: 3001/user
//@desc post/make a new user and store in users collection
//@patch (server path)/user/post
//@access admin level 

router.post(
    "/", 
    validateUser,
    async (req, res) => {

        try {

            const newUser = await User.create(req.body);

            res.json({
                msg: "user created successfully",
                document: newUser
            });
            
        } catch (error) {
            res
            .status(500)
            .json({error: error.message|| error})
        }

        }
)




module.exports = router;