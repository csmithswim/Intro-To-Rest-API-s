const express = require('express');
const router = express.Router();
const Movie = require('../models/Movie');
const Candy = require('../models/Candy');
const adminAuth = require('../middleware/adminAuth');
const extractToken = require('../middleware/extractToken');
const User = require('../models/User');
const isAdmin = require('../middleware/isAdmin');

//By default it is presumed that the views folder will have the pug files.


router.get('/login', (req, res) => {

    res.render('login')

})

router.get('/movierental/static', (req, res) =>  {

    const fileLoc = process.cwd() + '\\public\\homeStatic\\static-homePage\\home.html'; //Using current working directory to get the location of the project and specifying where our front end files are for our servers.
    
    res.sendFile(fileLoc)
})

router.get('/', 
extractToken, 
isAdmin, 
async (req, res) => {

    const loggedIn = req.authKey != undefined;

    const allMovies = await Movie.find({ 'inventory.available': {$gte: 1}} );

    const isAdmin = req.isAdmin || false;

    const renderOption = {
        all_movies: allMovies,
        isLoggedIn: loggedIn,
        isAdmin: isAdmin
    }

    res.render('home', renderOption)
})

router.get('/candy', async (req, res) => {

    const allCandy = await Candy.find({}),
    
        clientMsg = 'Number of Candy: ' + allCandy.length;

    res.render('candy', {all_candy: allCandy, message: clientMsg})
})

router.get('/admin',

extractToken,

adminAuth, (req, res) => {

    res.render('admin-movie')

})

router.get('/mrental/new/', (req, res) => {

    res.render('newMovie') //making a new render using a new pug file called newMovie
})

router.get('/mrental/update', (req, res) => {
    
    res.render('updateMovie')

})





module.exports = router;