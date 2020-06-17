function reqBodyLog(req, res, next) {

    console.log('Request Body...');

    console.log(req.body);

    next();
}

module.exports = reqBodyLog;