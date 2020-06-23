window.onload = () => {

    updateMovie.onclick = updateMovieReq;
}

function updateMovieReq(){

    //compile submition from form
    let reqBody = {};

    //loop through the form, each input is a new element to iterate through

    let movieId;

    for (const input of updateMovieForm) {

     if (input.name == 'Id') {

        movieId = input.value 
         
     } else {reqBody[input.name] = input.value
         
     }

        }

        reqBody.inventory = {available: reqBody.available, rented: 0};



    //make xhr



    const endpoint = `${location.origin}/movie/patch/${movieId}`

    reqObj = {

        headers: {

            'Access-Control-Allow-Origin': '*', 

            Accept: 'application/json',

            'content-type': 'application/json'

        },

        method: 'PATCH', 

        body: JSON.stringify(reqBody)

    }

    fetch(endpoint, reqObj)
    .then(rs => {return rs.json()})
    .then(response => {
        console.log(response);


})

}
