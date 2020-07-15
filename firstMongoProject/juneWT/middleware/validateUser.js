const User = require('../models/User'),
    validator = require("validator");

module.exports = async(req, res, next) => {

    const email = req.body.email,
        pass = req.body.password;
    let failedFields = [];

    if (!validator.isEmail(email)) {

        failedFields.push({
            field: 'email',
            msg: "Valid Email Required"
        });

    };            const emailExist = await User.findOne({ email: email }) != null;//expected outcome: boolean

            if (emailExist === null) {

                failedFields.push({

                    key: "email",
                    message: "Email In Use"

                })

            }
            
            if (!validator.isLength(pass, {min: 7, max:100}) || !validator.isAlphanumeric(pass, 'en-US')){
                failedFields.push({
                    key: "password",
                    message: "Length Failed Requirements OR Used Invalid Characters"
                })
            }
            
            if (failedFields.length > 0) {
                res
                .status(400)
                .json({
                    validation_error: failedFields
                })

            }
            
            else {            
            
            req.id = emailExist._id;           
            
            
            
            next()}
}

