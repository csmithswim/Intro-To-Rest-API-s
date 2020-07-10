const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const secret = process.env.JWT_SECRET;

module.exports = async (req, res, next) => {

    try {
        const email = req.body.email,
             emailValid = 
            (pass === undefined || pass.trim() === '')
            ? false
            : validator.isEmail(email);

        if (!emailValid) return res.status(409).json({message: "Login Failed"});      

        const user = await User.findOne({email: req.body.email});

        if (!user === null) return res.status(401).json({message: "Login Failed"});

        const pass = req.body.password

        const passTest = (pass === undefined || pass.trim() === '') ? false : await bcrypt.compare(req.body.password, user.password)

        if (!passTest) return res.status(409).json({message: "Login Failed"});

        req.user.id = user._id;

        next(); //if code execution reaches here, it is assumed the user has successfully logged in.

    } catch (err) {
        json.status(500).json({
                errorAt: err.stack,
                message: err.message || ''
        })        
    }    
}