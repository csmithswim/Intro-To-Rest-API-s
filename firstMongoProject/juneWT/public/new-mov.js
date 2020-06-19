window.onload = () => {


    submitMovie.onclick = submitMovieReq;

}

function submitMovieReq(){


    //compile submition from form
    let reqBody = {};

    //loop through the form, each input is a new element to iterate through

    for (const input of newMovieForm) {

        reqBody[input.name] = input.value;
         
        }

        reqBody.inventory = {available: reqBody.available, rented: 0};



    //make xhr

    const endpoint = `${location.origin}/movie/post`

    reqObj = {

        headers: {

            'Access-Control-Allow-Origin': '*', 

            Accept: 'application/json',

            'content-type': 'application/json'

        },

        method: 'POST', 

        body: JSON.stringify(reqBody)

    }

    fetch(endpoint, reqObj)
    .then(rs => {return rs.json()})
    .then(response => {
        console.log(response);


})

}
