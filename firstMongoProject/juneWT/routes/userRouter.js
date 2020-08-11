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
const extractToken = require('../middleware/extractToken');

const newError = require('../utils/newError');



//movie renting & returning 

//movie renting & returning 
router.patch(
    '/rent_or_return',
    extractToken,
    userAuth,    
    async (req, res) => {
        
        const {movieId, isRenting = true} = req.body;

        try {

            const movieQuery = 
                    isRenting 
                    ? { _id: movieId, 'inventory.available': { $gte: 1 }} 
                    : { _id: movieId };

            const userUpdate = 
                    isRenting 
                    ? { $addToSet: { rentedMovies: movieId} } 
                    : { $pull: { rentedMovies: movieId} };

            const movieUpdate = 
                    isRenting 
                    ? { $addToSet: { 'inventory.rented': req.user._id }, $inc: { 'inventory.available': -1 }} 
                    : { $pull: { 'inventory.rented': req.user._id }, $inc: { 'inventory.available': 1 }};

            const movie = await Movie.findOne(movieQuery);

            if (movie === null) {
                console.log(`Movie Id caused error renting ${movieId}`);
                throw newError('Movie Not Found or Movie Unavailable', 404);
            }
            
            const currentlyRenting = req.user.rentedMovies;

            if (
                currentlyRenting.includes(movieId) && isRenting
                ||
                !currentlyRenting.includes(movieId) && !isRenting
            ) 
            {
                const operation = isRenting ? 'renting' : 'returning';
                console.log(`User did something bad userId: ${req.user._id}`);
                throw newError(`Can not preform the ${operation} operation twice`, 409);
            }       
            
            //modify the user doc
            const newUser = await User.findByIdAndUpdate(
                req.user._id,
                userUpdate,
                {new: 1}
            )

            //modifying the movie doc
            const newMovie = await Movie.findByIdAndUpdate(
                movieId,
                movieUpdate,
                {new: 1}
            )

            res.json({
                message: "successs",
                user: newUser,
                movie: newMovie
            })
            
        } catch (err) {
            const errMsg = err.message || err;
            const errCode = err.code || 500;

            console.log(`Error in movie renting: ${errMsg}`);
            
            res.status(errCode).json({
                error: errMsg
            })
        }

    }
)


//Post route for users
//localhost: 3001/user
//@desc post/make a new user and store in users collection
//@patch (server path)/user/post
//@access admin level 




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

        // console.log(req.id)
        
        const token = jwt.sign({id: req.id}, secret, {expiresIn: '1h'});

        return res.json({token});
    }
)

//Patch all movies to now have an inventory that matches the model

module.exports = router;

//movie renting route

//movie 