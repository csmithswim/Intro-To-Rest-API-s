const User = require("../models/User")
const express = require("express");
const router = express.Router();
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Movie = require("../models/Movie");
const secret = process.env.JWT_SECRET;

const validateUser = require('../middleware/validateUser');
const loginUser = require('../middleware/loginUser');
const userAuth = require('../middleware/userAuth');
const adminAuth = require('../middleware/adminAuth');

const newError = require('../utils/newError');


//Post route for users
//localhost: 3001/user
//@desc post/make a new user and store in users collection
//@patch (server path)/user/post
//@access admin level 

router.patch(
    '/rent',
    userAuth,
    async (req, res) => {


    const movieId = req.body.movieId;

    try {

        const movie = await Movie.findOne({_id: movieId, 'inventory.available': {$gte: 1} });
    
        console.log(`\nFound Movie: ${movie}\n`);

        if (movie === null) {
            
        console.log(`Movie Id caused error error renting ${movieId}`);

        throw newError('Movie Not Found or Movie Unavailable', 404);

        }

        //check if the user is already renting
        if (req.user.rentedMovies.indexOf(movieId) != -1) {

            console.log(`User tried rented movie twice\n movieId: ${movieId}
            \nUserId: ${req.user._id}`);
            throw newError('Movie Not Found or Movie Unavailable', 409);

        }

        // modify the user doc 
        await User.updateOne(
            {_id: req.user._id},
            { $addToSet: { rentedMovies: movieId} }
        )


        //modifying the movie doc
        await Movie.updateOne(
            {_id: movieId}, 
            {
                $addToSet: {'inventory.rented': req.user._id},

                $inc: {'inventory.available': -1},
            },
            {new:1}
            
            )
            res.status(200).json({
                message: "Patch Successful"
            })

        
    } catch (err) {

        console.log(err.message.msg, err.message.status);

        const errMsg = err.message || err;

        console.log(`Error in movie renting: ${errMsg}`);

        res.status(500).json({
            error: errMsg

        })

    }

    }
)


router.get(
    '/testAuth',
    userAuth,
    (req,res) => {

        res.send('success you are logged in')
    }
)

//Our test route, node scans router files top to bottom and avoid using duplicate route names

router.get( 
    '/testAdminAuth',
    adminAuth,
    (req , res) => {

        res.send('success you are logged in')
    }
)

router.post(
    "/", 
    validateUser,
    
    async (req, res) => {

        //not allow a user to bypass admin level and isAdmin

        //encrypt password for safe DB storage
      
        req.body.password = await bcrypt.hash(req.body.password, 7);

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
//Put (login) route for users
//localhost:3001/users
//@desc put/login a new user and store in users collection
//@path (server path)/user/
//@access public

router.put(
    "/", 
    loginUser,    
    (req, res) => {        

        console.log(req.id)
        
        const token = jwt.sign({id: req.id}, secret, {expiresIn: '1h'});

        return res.json({token});
    }
)

//Patch all movies to now have an inventory that matches the model

module.exports = router;

//movie renting route

//movie 