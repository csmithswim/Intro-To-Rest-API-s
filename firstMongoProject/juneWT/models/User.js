//Required packages
const Mongoose = require('mongoose'); //Since mongoose is defined globaly we do not need to define a particular route.adminBtns

const User = new Mongoose.Schema({ //Now user will be equal to an instance of the Mongoose Schema class.

    email: { //If we use an object we can use multiple properties to test for several things in our Schema
        required: true,
        type: String,
        unique: true,
    }, 

    password: {
        required: true,
        type: String,
        minlength: 7,
        maxlength: 100,
    },

    adminProp: {
        adminLevel: {
            type: Number,
            default: 0
        },
        isAdmin: {
            type: Boolean,
            default: false
        }

    }

})


module.exports = Mongoose.model('user', User);

