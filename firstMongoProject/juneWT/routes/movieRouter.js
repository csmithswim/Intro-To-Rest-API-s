const express = require('express');

const router = express.Router(); //We are creating an instance of the Express Router Class, which is an object.

const Movie = require('../models/Movie');  //MongoDB collection is accessible through this variable

const findMovie = require('../middleware/findMovie');

const adminAuth = require('../middleware/adminAuth');
const newError = require('../utils/newError');

// Create a return route to accompany the rent route we created together.
// Create a route to decrease a movies available number.


router.get('/adminTest', adminAuth, async (req, res) => {
    try {

        res.json({message: 'Your\'e an Admin.'})

    } catch (err) {

        const errMsg = err.message || err;

        console.log(`Error In Movie Router Test, \n Error: ${errMsg}`)

            res.status(500).json({error: errMsg})
        
    }

})

router.patch(
    '/moviepatch1', 
    adminAuth, 
    async (req, res) => {

        try {

            const report = await Movie.updateMany(
                {},
            {
                inventory: {
                    available: 1, 
                    rented: []
                }
            }
        )
        res.json({
            allDoc: await Movie.find({}),
            report: report,            
            message: 'successful patch'})
            
        } catch (err) {
            res.status(500).json({error: err.message || err})
        }
    }
)

router.patch(
    '/addinven',
    adminAuth,
    async (req, res) => {

        try {

            // if (req.admin.adminProp.adminLevel <= 1) throw newError('Not Authorized', 401);

            //TODO
            //validate 'movieId' (check length) and 'inc' (check admin priv.) in req.

            const updatedMovie = await Movie.findByIdAndUpdate(
            req.body.movieId,
            {$inc: {'inventory.available': req.body.inc}},
            {new: 1}            
            )

            res.json(updatedMovie)


        } catch (err) {

            const errMsg = err.message || err;
            const errCode = err.code || 500;

            res.status(errCode).json({
                error: errMsg
            })
        }
    }
)

router.get('/all', async (req, res) => { //be sure to write movie before /all in postman 

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

//delete request
router.delete('/delete/:movieId',

findMovie, 

adminAuth,

async (req, res) => { //We use async so we can use the await keyword and allow a line to be run sync.

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

//request patch by movie ID

// router.patch('/patch/:movieId', findMovie, async (req, res) => {

//     const id = req.params.movieId;

//     const newVersion = req.foundMovie.__v + 1; //the version of the document should only be handled by the server/mongoDB

//     req.body.__v = newVersion; //this is an interger

//     try 
    
//     {
//         await Movie.update({_id: id}, req.body);

//     const updateDocument = await Movie.findById(id);

//     res.status(200).json({
//         status: 200, 

//         new_document: updateDocument,
//         old_document: req.foundMovie

//     })

//     }   catch (err) {

//         console.log('Error in HomeRouter: '+ err.message)

//         res.status(500).json({
//             status: 500,
//             message: err.message
//         })
//     }
// })

//request movie by DB id
router.get('/getmovie/:movieId', findMovie, (req, res) => {

res.status(200).json({
  status:200, 
  message: 'A movie was found', 

  movie: req.foundMovie
})

})

//create a new movie document in DB
router.post('/post', async (req, res) => {

    try {
        const newMovie = await Movie.create(req.body);

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

