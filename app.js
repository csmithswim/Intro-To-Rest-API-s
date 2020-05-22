const express = require('express'), //require function defines express

    morgan = require('morgan');

    reqBodyLog = require('./middleware/reqBodyLog');

const app = express() //represents application

const port = process.env.PORT || 3000; //global object process

app.use(express.static(__dirname + '/static/'));
app.use(morgan('dev'));
app.use(express.json()) //call the JSON method of express for every POST/GET request.

const homeRouter = require('./routes/homeRouter');

app.use('/', homeRouter)

const userRouter = require('./routes/usersRouter');

app.use('/users', userRouter);

let database = {
    allMovies: [

        {title: 'Looper',             release: 2012, available: false, imbdLink: 'https://www.imdb.com/title/tt1276104/', img: 'https://upload.wikimedia.org/wikipedia/en/0/0a/Looper_poster.jpg' }, 
        {title: 'Back To The Future', release: 1985, available: true, imbdLink: 'https://www.imdb.com/title/tt0088763/', img: 'https://upload.wikimedia.org/wikipedia/en/d/d2/Back_to_the_Future.jpg'}, 
        {title: 'Inception',          release: 2010, available: false, imbdLink: 'https://www.imdb.com/title/tt1375666/', img: 'https://upload.wikimedia.org/wikipedia/en/2/2e/Inception_%282010%29_theatrical_poster.jpg'}, 
        {title: 'Donnie Darko',       release: 2001, available: true, imbdLink: 'https://www.imdb.com/title/tt0246578/', img: 'https://m.media-amazon.com/images/M/MV5BOGRiOGM5MmUtMmI3Yi00ZTFhLTlhZDYtZGNmOWRmYTM4NWE2XkEyXkFqcGdeQXVyMTYzMDM0NTU@._V1_SY1000_CR0,0,702,1000_AL_.jpg' }, 
        {title: 'Primer',             release: 2004, available: true, imbdLink: 'https://www.imdb.com/title/tt0390384/', img: 'https://upload.wikimedia.org/wikipedia/en/f/f7/Primer_%282004_film_poster%29.jpg' }, 
        {title: 'Terminator 2',       release: 1991, available: true, imbdLink: 'https://www.imdb.com/title/tt0103064/', img: 'https://m.media-amazon.com/images/M/MV5BMGU2NzRmZjUtOGUxYS00ZjdjLWEwZWItY2NlM2JhNjkxNTFmXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_.jpg' },
        {title: 'Source Code',        release: 2011, available: true, imbdLink: 'https://www.imdb.com/title/tt0945513/', img: 'https://upload.wikimedia.org/wikipedia/en/thumb/e/e5/Source_Code_Poster.jpg/220px-Source_Code_Poster.jpg' },
        {title: 'Déjà Vu',            release: 2006, available: false, imbdLink: 'https://www.imdb.com/title/tt0453467/', img: 'https://upload.wikimedia.org/wikipedia/en/thumb/c/cf/DejaVuBigPoster.jpg/220px-DejaVuBigPoster.jpg' }
 
    ],

    users: []
}

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

//This is for all courses

 app.get('/api/courses', (req, res) =>  {

   res.send([1,2,3]); //in the future when we are working with real databases we will return objects in the send function

 })

//this is for one course

app.get('/api/posts/:year/:month', (req,res)  => {
    res.send(req.query); //It is possible to have multiple parameters in a route. This parameter can get all of the posts of a given month in a given year.
//These two properties names are based on route parameters.

//Query paramaters are parameters that are added in the url after a question mark, for example we can find all the posts in january 2018 and sort by name by added ?sortBy=name  This is additional information for our backend services. Route are essential, query are optional. Query parameters are stored in an object.

});

 //There is no more conditions when we use Express, it gives our applications a skeleton and structure.
 //When nodemon is installed, it is watching all the files and extensions in the folder

 //Port assignment numbers are dynamically assigned by servers and we cannot rely upon an arbitrary static number like 3000 for our ports in the future.
//The way to work around this is using an environment variable...PORT. It is a variable that is part of the environment in which is run. Its value is set outside the application.

//to set an environment variable, exit the console and type set EXPORT=5000
