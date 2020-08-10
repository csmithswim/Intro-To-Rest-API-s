window.onload = () => {

    submitUpdate.onclick = updateMovieReq;

    submitNew.onclick = submitNewRequest;

    console.log('test')
}

function submitNewRequest(){

    //compile submition from form
    let reqBody = {};

    //loop through the form, each input is a new element to iterate through

    for (const input of newMovieForm) {

        reqBody[input.name] = input.value;
         
        }

        reqBody.release = parseInt(reqBody.release)

        reqBody.inventory = {available: parseInt(reqBody.available), rented: []};

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

function updateMovieReq(){

    if (idInput.value.trim() === '' || idInput.value.trim().length != 24) return alert('A valid Id must be provided');

    let endpoint = location.origin + '/movie/patch/' + idInput.value;
    
     let reqBody = {};

    //loop through the form, each input is a new element to iterate through

     for (const input of updateMovieForm) {

        const temp = input.value.trim();

     if (temp != '' && input.name != 'id') {

        reqBody[input.name] = temp;
     }
                             
}
    const reqObj = {

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
