function clickedBtn() {
    console.log('test')
}

function clickedDltBtn() {

}
window.onload = () => {

    console.log(document.cookie);

    setEventListeners()

    reqSingleMovieData.onclick = clickedBtn;

    deleteSingleMovie.onclick = clickedDltBtn;    

    const editDivs = document.getElementsByClassName('editMovie');

    for( const div of editDivs) {div.style.display = 'none';   

};

    const displayDivs = document.getElementsByClassName('displayMovie');

    for( const div of displayDivs) {div.style.display = 'flex'};   

    allMovies.style.display = 'flex';    
}

function setEventListeners() {
       
    const getButtons = document.getElementsByClassName('getMovie'); //A method of the DOM that returns an iterable object.

    for (const button of getButtons) {button.onclick = reqSingleMovieData}; //Iterates through the object, setting the onclick property of an element in a class of elements.

    const getDltButtons = document.getElementsByClassName('deleteMovie');

    for (const button of getDltButtons) {button.onclick = deleteSingleMovie};

    const editViewButtons = document.getElementsByClassName('editMovieBtn');

    for( const button of editViewButtons) {button.onclick = changeEditView};  

    const editSubmitButtons = document.getElementsByClassName('submitEdit');

    for( const button of editSubmitButtons) {button.onclick = submitEditReq};  

    
    const returnSubmitButtons = document.getElementsByClassName('returnMovie');

    for( const button of returnSubmitButtons) {button.onclick = submitReturnReq}; 

    const rentSubmitButtons = document.getElementsByClassName('rentMovie');

    for( const button of rentSubmitButtons) {button.onclick = submitRentReq}; 

    console.log(rentSubmitButtons)

    const logoutBtn = document.getElementById('logoutBtn');
    const loginBtn = document.getElementById('loginBtn');
    const adminBtn = document.getElementById('adminBtn');


    if (loginBtn) {
        
        loginBtn.onclick = loginUser;
    } 

    if (logoutBtn) {

        logoutBtn.onclick = logoutUser;
    } 

    if (adminBtn) {

        adminBtn.onclick = redirectAdmin;
        
    }

}

function submitReturnReq(){
    const movieId = this.parentElement.id;

    const movieObj = {movieId: movieId, isRenting: false};

    const endPoint = location.origin +'/user/rent_or_return';

    const reqOptions = {headers:   
        {'Acess-Control-Allow-Origin': '*',
        Accept: 'application/json',
        'content-type': 'application/json'}, 

        method: 'PATCH',
        body: JSON.stringify(movieObj)    
    }    

    fetch(endPoint, reqOptions)
    .then(rs => {

        if (rs.status === 200){

            alert('You Have Returned A Movie')
    
            } else {
                
            alert('You Cannot Return A Movie You Are Not Renting')
    
            }        

    })
}

function submitRentReq(){
    
    const movieId = this.parentElement.id;

    const movieObj = {movieId: movieId, isRenting: true};

    const endPoint = location.origin +'/user/rent_or_return';

    const reqOptions = {headers:   
        {'Acess-Control-Allow-Origin': '*',
        Accept: 'application/json',
        'content-type': 'application/json'}, 

        method: 'PATCH',
        body: JSON.stringify(movieObj)    
    }    

    fetch(endPoint, reqOptions)
    .then(rs => {
        
    if (rs.status === 200){

        alert('You Have Rented A Movie')

        } else {
            
        alert('You Cannot Rent The Same Movie Twice')

        }

})  }

function loginUser() {

    location = location.origin + '/login';
    // console.log('test')

}
function logoutUser() {

   const token = document.cookie.indexOf('token')
   
    if ( token !== -1 ) {
    document.cookie = "token=; expires='Thu, 01, Jan 1970 00:00:00 UTC'; path=/;";
           alert('Logged Out')
           location.reload();
    } else {
        alert('You are not logged in.')
    }
}

function redirectAdmin() {

location = location.origin+'/admin';

}

function reqSingleMovieData () {

    // console.log(this);
    const movieId = this.parentElement.id; 

        endpoint = `http://localhost:3001/movie/${movieId}`

        xhr = new XMLHttpRequest();

    xhr.open('GET', endpoint, true);

    xhr.onload = () => {

        const res = JSON.parse(xhr.responseText);

        console.log(res);
    }

    xhr.send()

}
/* Fetch GET request
    const movieId = thisparentElement.id,

        endpoint = `${location.origin}/movie/${movieId}`;

    fetch(endpoint)
    .then(rs => {return rs.json()})
    .then(res => {

        console.log(res);

    })

} */ 
function deleteSingleMovie() {

    //Prompt user to prevent accidental deletion
    let confirm = prompt('Type "confirm" to delete document');

    //Check if the user typed confirm
    if (confirm != 'confirm') return alert('Document Deletion Canceled')

    const movieId = this.parentElement.parentElement.id;

    let endpoint = `http://localhost:3001/movie/delete/${movieId}`;

    reqObj = {
        method: 'DELETE', 
    };

    fetch(endpoint, reqObj)
    .then(rs => {
        
        if (rs.status === 200) { //doc DB deletion success, delete element from FE

            this.parentElement.parentElement.remove();

        } else { //alert the user that the req was unsuccessful

            const resMsg =  "An error occured trying to deleted movie from DB";

            alert(resMsg)
        }

    })
        
}

function changeEditView(){

    const movieDivChildren = this.parentElement.parentElement.childNodes; 

    movieDivChildren.forEach(node => {

        if (node.className === 'displayMovie' || node.className === 'editMovie') {

            node.style.display = node.style.display == 'none' ? 'flex': 'none';

        }

    })
}

function submitEditReq() {
 //Fetch request and data validation PATCH
 
    
    const movieId = this.parentElement.parentElement.parentElement.id

    const form = this.parentElement;

    let validationErr = [];

    // console.log(movieId)

    // console.log(form)

    let reqBody = {};

    for (const input of form) {

        let inputValue = input.value.trim();

        if (inputValue != '') reqBody[input.name] = inputValue;

        if (input.validationMessage != '') validationErr.push(`${input.name}: ${input.validationMessage}`);

    }

    const imdbRegEx = /imdb/g;

    if ( !(imdbRegEx.test(form.imdb_link)) ) validationErr.push(`IMDB Link Provided Did Not Include imdb`);

        if (validationErr.length > 0) {

            const message = `Error/s Occured:\n\n${validationErr.join('\n')}`;

            return alert(message);
        }
    
    let endpoint = location.origin + '/movie/patch/' + movieId
    
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
    .then(rs => {
        

     //Check if patch was successful, if it is successful switch back to original screen, if not successful alert the user. 

        if (rs.status === 200) { //doc DB PATCH success, edit movie information for front end.

            this.parentElement.parentElement.remove();

        } else { //alert the user that the req was unsuccessful

            const resMsg =  "An error occured trying to PATCH movie from DB";

            alert(resMsg)
        }

    })

console.log(reqBody);
console.log(reqBody.title)

}


 //Check if patch was successful, if it is successful switch back to original screen, if not successful alert the user. 