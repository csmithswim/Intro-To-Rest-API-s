This repo contains my first work with backend of REST APIs.

REST - Representational State Transfer - CREATE/READ/UPDATE/DELETE - CRUD

The main HTTP methods -

*Get(for getting data)

Post(for posting data)

Put(for updating data)

Delete(for deleting data)

Technology Used:

* NPM

*Node / Nodemon

*Express

*MongoDB

Starting a new NPM project:

1. npm init -y (creates a package.json which will outline our project)

2. npm install < package/s name/s > -> install all the packages you will need for your project

    for a REST API project you will need the following packages:

        Required...


        *express
        *mongoose
        *dotnv

        Optionally..

        Nodemon
        (auth package)
        etc....

3. Create our main server file. app.js or index.js

4. use Node's 'require' to import the packages needed in the server file.

5. set up route handling








let endpoint = 'http://vidly.com/api/customers';

/*


the / after api is a resource, we can expose our resources on the endpoints.

For one customer we do ../customers/1

For the whole object we do ../customers/ for the HTTP request

For put requests, we have to include the customer object in the body of the request.

GET /api/customers - the whole object
GET /api/customers/1 - one customer
PUT /api/customers/1  - editing one customer
DELETE /api/customers/1 - deleting one customer
POST /api/customers - posting a customer

*/

// const http = require('http');

// const server = http.createServer((req, res) => {

//     if (req.url ==='/') {
//         res.write('Hello World');
//         res.end();
//     }

// if (req.url === '/api/courses') {
//     res.write(JSON.stringify([1,2,3]));
//     resizeBy.end();
// }

// });

// server.listen(3000);

// console.log('Listening on port 3000...');

//We need a framework structure for this particular program because it isnt maintainable in this form, it gives the application a proper structure and add more routes while keeping the code maintaiable.








