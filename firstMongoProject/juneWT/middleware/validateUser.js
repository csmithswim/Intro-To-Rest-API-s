const User = require('../models/User');
const validator = require("validator");


validate = async (req, res, next) => {

            const email = req.body.email,
                pass = req.body.password,
                failedValues = [];

            if (!validator.isEmail(email)){
                failedValues.push({
                    key: "email",
                    message: "Valid Email Required"
                })
            } 

            const emailExist = await User.findOne({ email: email }) != null;//expected outcome: boolean

            if (emailExist === null) {

                failedValues.push({

                    key: "email",
                    message: "Email In Use"

                })

            }
            
            if (!validator.isLength(pass, {min: 7, max:100}) || !validator.isAlphanumeric(pass, 'en-US')){
                failedValues.push({
                    key: "password",
                    message: "Length Failed Requirements OR Used Invalid Characters"
                })
            }
            
            if (failedValues.length > 0) {
                res
                .status(400)
                .json({
                    validation_error: failedValues
                })

            }
            
            else {next()}
}

