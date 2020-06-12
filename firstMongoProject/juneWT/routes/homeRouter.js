const express = require('express');
const router = express.Router();


router.get('/', (req, res) =>  {

    const fileLoc = process.cwd() + '\\public\\home.html'; //Using current working directory to get the location of the project and specifying where our front end files are for our servers.

    res.sendFile(fileLoc)
})

module.exports = router;