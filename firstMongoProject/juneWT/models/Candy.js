const mongoose = require('mongoose');

const validator = require('validator');

const Candy = new mongoose.Schema({

    name: {
        unique: true,
        required: true,
        type: String        
    },
    calories: {
        required: true,
        type: Number
    }, 
    type: {
        required: true, 
        type: String,
    },
    img: {
        required: true,
        type: String,
        validate: (value) => {

            const test = !validator.isURL(value)

            if (test) {

                throw new Error('Image Link Not Valid')
            }
        }
    },

    inventory: {

        required: false,

        type: Object,

        default: {

                displayCase: 1, //giving it a type Number is for validation when you give a post request.
                stockRoom: 0
        }
    }
})

module.exports = mongoose.model('Candy', Candy); //What the collection gets called.
