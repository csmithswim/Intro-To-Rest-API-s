require('dotenv').config();

const express = require('express'),

    server = express(),

    morgan = require('morgan'),

    mongoose = require('mongoose'),

    port = process.env.PORT || 3001,

    deprecatedObj = { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false},
    
     connectionURI = process.env.MONGO;

    homeRouter = require('./routes/homeRouter');

    movieRouter = require('./routes/movieRouter');

    userRouter = require('./routes/userRouter');

    candyRouter = require('./routes/candyRouter');

    //some middleware needs to go before others
    server.use(morgan('dev'));

    server.use(express.json());

    server.set('view engine', 'pug');//Setting up a link between pug and our server.


    server.use(express.static('public'));
    

    // server.use(('/mrental', express.static('./public/homeStatic/')));
    // server.use(('/mrental/static', express.static('./public/homeStatic/static-homePage')));
    
    //express.json and morgan must be called before homerouter
    server.use('/', homeRouter);

    server.use('/user', userRouter);

    server.use('/movie', movieRouter)//We do not need to specify movie in our movieRouter program

    server.use('/candy', candyRouter)

      mongoose.connect(connectionURI, deprecatedObj, () => {

        console.log('The Server Is Connected To The Database');
    })

mongoose.connection.on('error', (err) => {

    console.log('An error occured trying to connect to MongoDB, Error: '
     + err);
})

mongoose.connection.on('connected', () => {

    console.log('The Server is attempting to connect to the database...')

})

server.listen(port, () => {

    console.log('Server Listening on Port: ' + port);

})

