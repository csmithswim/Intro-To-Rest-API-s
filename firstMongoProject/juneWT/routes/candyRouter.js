const express = require('express');

const router = express.Router(); //We are creating an instance of the Express Router Class, which is an object.

const Candy = require('../models/Candy');  //MongoDB collection is accessible through this variable

const findCandy = require('../middleware/findCandy');


router.get('/all', async (req, res) => { //be sure to write candy before /all in postman 

    try {
    
        const allCandy = await Candy.find({})
    
        let Json;
    
        if (allCandy.length == 0){
            Json = {
                status: 200,
                message: 'No candy was found', 
            }
    
        } else {
            Json = {
                status: 200,
                message: 'All candy was found',
                candy: allCandy
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
router.delete('/delete/:candyId', findCandy, async (req, res) => { //We use async so we can use the await keyword and allow a line to be run sync.

    console.log(req.params)

    try {

        const report = await Candy.findByIdAndDelete(req.params.candyId); //req is an object, param is an object whenever a request is made, populated by key value pairs with the endpoint we create.
        console.log(report);

        res.status(200).json({
            status: 200, 
            deleted_candy: req.foundCandy
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
        delete_candy: req.found
    })
})

//request patch
router.patch('/patch/:candyId', findCandy, async (req, res) => {

    const id = req.params.candyId;

    const newVersion = req.foundCandy.__v + 1; //the version of the document should only be handled by the server/mongoDB

    req.body.__v = newVersion; //this is an interger

    try 
    
    {
        await Candy.update({_id: id}, req.body);

    const updateDocument = await Candy.findById(id);

    res.status(200).json({
        status: 200, 

        new_document: updateDocument,
        old_document: req.foundCandy

    })

    }   catch (err) {

        console.log('Error in HomeRouter: '+ err.message)

        res.status(500).json({
            status: 500,
            message: err.message
        })
    }
})

//request Candy by DB id
router.get('/:candyId', findCandy, (req, res) => {

res.status(200).json({
  status:200, 
  message: 'A candy was found', 

  candy: req.foundCandy
})

})

//create a new candy document in DB
router.post('/post', async (req, res) => {

    try {
        const newCandy = await Candy.create(req.body);

        await newCandy.save()

        res.json({

            status: 201,
            new_candy: newCandy,
            message: 'New Candy Added To the Database'
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

