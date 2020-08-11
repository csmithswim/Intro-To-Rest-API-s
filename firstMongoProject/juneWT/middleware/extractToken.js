const cookie = require('cookie');

module.exports = (req, res, next) => { //Changing the format from cookie(large string) to JSON key/value pairs

    const parsed = cookie.parse(req.headers.cookie || "");

    const token = parsed.token;

    req.authKey = token; //Sets to request property to be used in any middleware function

    next();
}

