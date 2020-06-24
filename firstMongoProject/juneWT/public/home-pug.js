function clickedBtn() {
    console.log('test')
}

function clickedDltBtn() {

}
window.onload = () => {

    setEventListeners()

    reqSingleMovieData.onclick = clickedBtn;

    deleteSingleMovie.onclick = clickedDltBtn;
    

    const editDivs = document.getElementsByClassName('editMovie');

    for( const div of editDivs) {div.style.display = 'none';

    console.log

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

    let reqBody = {};

    for (const input of form) {

        let inputValue = input.value.trim();

        if (inputValue != ''){

            reqBody[input.name] = inputValue;

      }

    }

console.log(reqBody);

}

