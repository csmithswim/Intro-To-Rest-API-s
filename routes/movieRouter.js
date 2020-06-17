//Things routers/router files need

    //require express (const express = require('express'))
    //require fs(if working with local database)

    //export the router var

//Things app.js needs that a router does not

//require an instance of the express obj
//app.listen()

const express = require('express');

const fs = require('fs');

const dbRead = require('../middleware/readDB');

const router = express.Router();

const textFile = process.cwd() + '/database/database.txt';


router.get('/', dbRead, (req, res) => {
    //send json with all the movie docs
    console.log(req.dbData)

    res.json({
        status: 200, 
        all_movies: req.dbData.movies
    })
})

router.get('/:id', dbRead, validDB, (req, res) => {
    
        return res.json({
        status: 200,
        movie: req.found
    })
})

//post a new movie

router.post('/', dbRead, validNewMov, (req, res) => {
        
    newDataBaseData = req.dbData;

    newDataBaseData.movies.push(req.body)

    newDataBaseData = JSON.stringify(newDataBaseData);

    fs.writeFileSync(textFile, newDataBaseData);

    res.status(200).json({
        status: 200,
        message: 'posted successfull',
        new_movie: 'newMovie'
    })
})

//update movie

router.patch('/:id', dbRead, validDB, (req, res) => {

    let updatedData = req.found,

        mId = req.params.id,

        DB = req.dbData;

    for (const k in updatedData) {

        if (req.body[k] != undefined) {
            updatedData[k] = req.body[k]
        }
    }
    
    DB.movies.splice(mId - 1, 1, updatedData)

    DB = JSON.stringify(DB);

    fs.writeFileSync(textFile, DB);

    res.send('testing PATCH')
} )


//delete a movie

router.delete('/:id', dbRead, validDB, (req, res) => {

    let databaseData = req.dbData;

    databaseData.movies.splice(req.params.id-1, 1);

    databaseData = JSON.stringify(databaseData);

    fs.writeFileSync(textFile, databaseData);

    res.status(200).json({
        status: 200,
        delete_movie: req.found
    })

})

function validNewMov (req, res, next){
    
    //get the new movie in an JS object

    console.log(req.body);
    
    //check for title, release, available, imdbLink, img

    const { title: t, release: r, available , imdbLink, img } = req.body;

    let newMovObj = {
        title: t,
        release: r,
        available: available,
        imdbLink: imdbLink,
        img: img
    };

    let bodyLen = Object.keys(req.body).length;

    let newMovObjLength = Object.keys(newMovObj).length;

       
    if (bodyLen < newMovObjLength || bodyLen > newMovObjLength + 20) {

        res.status(400).json({
            status: 400,
            message: 'Bad Request, there were too few or too many key/value pairs in the request body',
            your_body_length: bodyLen, 
            required_body_length: newMovObjLength
        })

    return
   }

   let missingKeys = [];

   for (const k in newMovObj) {
       if (newMovObj[k] == undefined) {
          
        missingKeys.push(k)           
       }
   }

   if (missingKeys.length > 0) {

    res.status(400).json({
        status: 400,
        error: 'Missing Keys',
        message: `The request body was missing the keys; ${missingKeys}`
    })
        return 
   }

   req.body = newMovObj;

   next()
}
function validDB(req, res, next){

    if (!req.dbData.movies) {
        return res.status(500).json({
            status: 500,
            message: 'server can not access movies in database'
        })
    }

    const moviesCollection = req.dbData.movies;

    const movieId = parseInt(req.params.id);

    if (isNaN(movieId)) {

        return res.status(404).json({
            status: 404,
            message: 'Not a valid Id, must be a number'
        })
    } else if (movieId <= 0 || movieId > moviesCollection.length-1){

        return res.status(404).json({
            status: 404,
            message: 'movie selected is not in the valid range'
        })
    }
    
    req.found = moviesCollection[movieId-1];    
    
next()

}

module.exports = router;