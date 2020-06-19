function clickedBtn() {
    console.log('test')
}

function clickedDltBtn() {

}
window.onload = () => {
    reqSingleMovieData.onclick = clickedBtn;

    deleteSingleMovie.onclick = clickedDltBtn;

    const getButtons = document.getElementsByClassName('getMovie') //A method of the DOM that returns an iterable object.

    for (const button of getButtons) {button.onclick = reqSingleMovieData;}//Iterates through the object, setting the onclick property of an element in a class of elements.

    const getDltButtons = document.getElementsByClassName('deleteMovie')

    for (const button of getDltButtons) {button.onclick = deleteSingleMovie;}
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

    const movieId = this.parentElement.id;

    console.log(movieId);
    
      xhr = new XMLHttpRequest();

    endpoint = `http://localhost:3001/movie/delete/${movieId}`;

    xhr.open('DELETE', endpoint, true);

    xhr.onload = () => {

        const res = JSON.parse(xhr.responseText);

        console.log(res);
    }

    xhr.send()
}

/* 
    const movieId = this.parentElement.id;

        endpoint = `${location.origin}/movie/delete/$movieId}`

        reqObj = {
            method: 'DELETE', 
        };

    fetch(endpoint, reqObj)
    .then(rs => {return rs.json()})
    .then(res => {

        console.log(res)
    })


*/ 




