const express = require('express');
const router = express.Router();
const Movie = require('../models/Movie');
const Candy = require('../models/Candy');
const adminAuth = require('../middleware/adminAuth');


//By default it is presumed that the views folder will have the pug files.

router.get('/', (req, res) => {  //A test request

    //Expected query properties: 'msg' and 'title' using object destructuring
    const {msg, title} = req.query;

    console.log(msg, title);

    res.render('test', {message: msg || 'asdf', 
     titleVar: title || 'title'})
    
})

router.get('/movierental/static', (req, res) =>  {

    const fileLoc = process.cwd() + '\\public\\homeStatic\\static-homePage\\home.html'; //Using current working directory to get the location of the project and specifying where our front end files are for our servers.
    
    res.sendFile(fileLoc)
})

router.get('/mrental', async (req, res) => {

    const allMovies = await Movie.find({ 'inventory.available': {$gte: 1}} );

        clientMsg = 'Number of Movies: ' + allMovies.length;

    res.render('home', {all_movies: allMovies, message: clientMsg})
})

router.get('/candy', async (req, res) => {

    const allCandy = await Candy.find({}),
    
        clientMsg = 'Number of Candy: ' + allCandy.length;

    res.render('candy', {all_candy: allCandy, message: clientMsg})
})

router.get('/mrental/admin/:key', adminAuth, (req, res) => {

    res.render('admin-movie')

})

router.get('/mrental/new/', (req, res) => {

    res.render('newMovie') //making a new render using a new pug file called newMovie
})

router.get('/mrental/update', (req, res) => {
    
    res.render('updateMovie')

})





module.exports = router;