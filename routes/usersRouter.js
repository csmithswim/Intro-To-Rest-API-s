let express = require('express'),

    fs = require('fs')
    router = express.Router();

    // console.log(__dirname);

router.get('/test', (req, res) => {

    res.send('User\'s Page')
});

router.get('/test', (req, res) => {

    res.send('user testing')

})

router.post('/', (req, res) => {

    let textFile = process.cwd() + '/database/database.text';

    let parsedData = fs.readFileSync(textFile, 'utf8'); 

    if (parsedData[0] != '{' || parsedData[parsedData.length-1] != '}') {

        res.send('no users yet')
    }

    parsedData = JSON.parse(parcedData);

    let allUsers = '';

    for (let i = 0; i < parsedData.user.length; i++) {
     
        for (const key in parsedData.user[i]) {

            const value = parsedData.user[i][key];

            allUsers += `User ${i+1}${key} - ${value}\n`;
        }
    }

     if (parsedData.user == undefined){
        parsedData.user = [req.body];
    } else {
        parsedData.user.push(req.body)
    }

    parsedData = JSON.stringify(parsedData);

    fs.writeFileSync(textfile, parsedData);

    res.json({
        message: 'successful new user',
        status: 200,
        new_user: req.body
        });
    
        if (err) {
            console.log(err);
            res.json({
                message: err.message,
                status: 500,
           });
        }
    })

module.exports = router;