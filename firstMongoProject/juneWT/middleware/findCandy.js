let Movie = require('../models/Candy'); //Creating 

async function findCandy(req, res, next) { //This is async because we are accessing the database/mongodb. 

    try {
        const id = req.params.candyId;

        let foundCandy = await Candy.find({_id: id});

    if (foundCandy.length == 0 ) {

        res.status(404).json({
            status: 404,
            message: 'No movie with the given ID'
        })
    } else {

            foundCandy = foundCandy[0];

            req.foundCandy = foundCandy;

        next()
    }
    } catch (err) {

        res.status(500).json({
            status: 500,
            message: err.message,
            full_report: err
        })

    }
}

module.exports = findCandy;