window.onload = () => {

    updateMovie.onclick = updateMovieReq;
}

function updateMovieReq(){

    //compile submition from form
    let reqBody = {};

    //loop through the form, each input is a new element to iterate through

    let movieId;

    for (const input of updateMovieForm) {

    //  if (input.name == 'id') return 

      reqBody[input.name] = input.value;    

     } 

     const reqObj = {

        url: endpoint, 

        headers: {

            'Access-Control-Allow-Origin': '*',

            Accept: 'application/json',

            'content-type':'application/json'    
        },

        method: 'PUT',

        body: JSON.stringify(reqBody)

     };

     fetch( endpoit, reqObj)
     .then(rs => {return rs.json()})
     .then(res => {
         console.log(res);

     })
     .catch( err => {


     })
    }
        
