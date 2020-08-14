window.onload = () => {

    submitReg.onclick = registerUser;
}

let createUser = () => {

    let reqBody = {};

    for (const input of formDiv) {

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


  

