const express = require('express'); //require function defines express

const app = express() //represents application

 //Takes two arguments, the first is the path/URL. The second is the call back function, the function that will be called when we get a http request for that endpoint. req/res

 app.get('/', (req, res) => {

    res.send('Hello World!!!'); //How we define a route, define the path/URL and the call back function/route handler.

 });

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

const port = process.env.PORT || 3000; //global object process

 app.listen(port, () => console.log(`Listening on port ${port}...`));