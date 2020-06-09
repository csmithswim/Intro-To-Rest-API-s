const express = require('express');
const router = express.Router();
const Movie = require('../models/Movie'); //Movie is our access to MongoDB. Capitalize variavles used for schemas.

const findMovie = require('../middleware/findMovie');

router.get('/', (req, res) =>  {
    res.send('hello career dev')
})

router.get('/all', async (req, res) => {

    try {
    
        const allMovies = await Movie.find({})
    
        let Json;
    
        if (allMovies.length == 0){
            Json = {
                status: 200,
                message: 'No movies were found', 
            }
    
        } else {
            Json = {
                status: 200,
                message: 'All movies were found',
                movies: allMovies
            };
        }

        res.status(200).json(Json);
    }
     
     catch (err){
    
        res.status(500).json({
            status: 500,
            message: 'An error occured',
            error: err.message,
            full_report: err
        })
    
    }
    
    }) 
//request for delete request

router.delete('/movie/delete/:movieId', findMovie, async (req, res) => { //We use async so we can use the await keyword and allow a line to be run sync.

    console.log(req.params)

    try {

        const report = await Movie.findByIdAndDelete(req.params.movieId); //req is an object, param is an object whenever a request is made, populated by key value pairs with the endpoint we create.
        console.log(report);

        res.status(200).json({
            status: 200, 
            deleted_movie: req.foundMovie
        })

    } catch (err) {

        console.log('Error in HomeRouter: '+ err.message)

        res.status(500).json({
            status: 500,
            message: err.message
        })

    }

 
    res.status(200).json({
        status: 200,
        delete_movie: req.found
    })
})

router.patch('/movie/patch/:movieId', findMovie, async (req, res) => {

    const id = req.params.movieId;

    const newVersion = req.foundMovie.__v + 1; //the version of the document should only be handled by the server/mongoDB

    req.body.__v = newVersion; //this is an interger

    try 
    
    {
        await Movie.update({_id: id}, req.body);

    const updateDocument = await Movie.findById(id);

    res.status(200).json({
        status: 200, 

        new_document: updateDocument,
        old_document: req.foundMovie

    })

    }   catch (err) {

        console.log('Error in HomeRouter: '+ err.message)

        res.status(500).json({
            status: 500,
            message: err.message
        })
    }
})


//Movie.update(<{_id: id}>, <req.body>)

router.get('/movie/:movieId', findMovie, (req, res) => {

res.status(200).json({
  status:200, 
  message: 'A movie was found', 

  movie: req.foundMovie
})

})

//request all movies in collection/db

router.post('/', async (req, res) => {

    try {
        const newMovie = await new Movie(req.body);

        await newMovie.save()

        res.json({

            status: 201,
            new_movie: newMovie,
            message: 'New Movie Added To the Database'
        })
        
    } catch (err) {

        console.log(err.message);
        
        res.json({
            message: 'An Error Occured During Post Request',
            error: err.message,
            status: 500
        })
    }

console.log(req.body)


})

module.exports = router;