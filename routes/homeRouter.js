let express = require('express'),

    router = express.Router();

    // console.log(__dirname);

router.get('/', (req, res) => {

    res.sendFile(process.cwd() + '/static/home.html')

});

module.exports = router;