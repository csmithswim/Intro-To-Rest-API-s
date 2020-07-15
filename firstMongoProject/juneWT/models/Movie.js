const mongoose = require('mongoose');

const validator = require('validator');

const Movie = new mongoose.Schema({

    title: {
        unique: true,
        required: true,
        type: String        
    },
    release: {
        required: true,
        type: Number
    }, 
    imdb_link: {
        required: true, 
        type: String,
        validate: (value) => {

            const urlTest = !validator.isURL(value);

            imdbTest = /imdb/;

            if (urlTest && imdbTest.test(value)) { //if the URL was not valid

                throw new Error('Imdb link was invalid')
            }
        }
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
                available: 1, //giving it a type Number is for validation when you give a post request.
                rented: {
                    type: [mongoose.Schema.Types.ObjectId],
                    ref: 'users',
                    default: []
                }
        }
    }
})

module.exports = mongoose.model('Movie', Movie); //What the collection gets called.
