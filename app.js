const express = require('express'), //require function defines express

    morgan = require('morgan');

    reqBodyLog = require('./middleware/reqBodyLog');

require('dotenv').config();

//updating database with read/write file. Creating our database on our text.

// const fs = require('fs')

// let textFile = process.cwd() + '/database/database.text';

// let parsedData = fs.readFileSync(textFile, 'utf8'); 

// if (parsedData[0] != '{' || parsedData[parsedData.length-1] != '}') {
//     parsedData = '{}'
// }

// parsedData = JSON.parse(parsedData);

// parsedData.movies = database.movies;

// console.log(parsedData);

// parsedData = JSON.stringify(parsedData);

// fs.writeFileSync(textFile, parsedData);

//end of code

const app = express() //represents application

const port = process.env.PORT || 3000; //global object process

//Middleware below


//Middleware that will be executed on all routes with all request methods
app.use(express.static(__dirname + '/static/'));
app.use(morgan('dev'));
app.use(express.json()) //call the JSON method of express for every POST/GET request.

//Middleware that will be executed on specific routes

//homepage

const homeRouter = require('./routes/homeRouter');

app.use('/', homeRouter);

//user page

const usersRouter = require('./routes/usersRouter');

app.use('/users', usersRouter);

//movie page

const movieRouter = require('./routes/movieRouter') //file name  

app.use('/movie', movieRouter);

app.get('/', reqBodyLog, (req ,res) => {

    res.sendFile(__dirname + '/static/home.html')
})

app.post('/users', reqBodyLog, (req, res) => {

        res.json(req.body)
})

// console.log(__dirname);

 app.listen(port, () => console.log(`Listening on port ${port}...`));

 //Takes two arguments, the first is the path/URL. The second is the call back function, the function that will be called when we get a http request for that endpoint. req/res

//  app.get('/', (req, res) => {

    // res.send('Hello World!!!'); //How we define a route, define the path/URL and the call back function/route handler.

//  });

 //finally we have to listen on a given port, give 3000 as an argument and a call back function when it starts listening

