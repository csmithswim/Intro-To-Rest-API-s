console.log('logging test');

function clickedBtn() {
    console.log('test')
}

function clickedDltBtn() {



}
window.onload = () => {

    reqSingleMovieData.onclick = clickedBtn;

    deleteSingleMovie.onclick = clickedDltBtn;

    const getButtons = document.getElementsByClassName('getMovie')

    for (const button of getButtons) {button.onclick = reqSingleMovieData;}

    const getDltButtons = document.getElementsByClassName('deleteMovie')

    for (const button of getDltButtons) {button.onclick = deleteSingleMovie;}

}

function reqSingleMovieData () {

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

function deleteSingleMovie() {

    const movieId = this.parentElement.id,

    xhr = new XMLHttpRequest(),

    endpoint = `http://localhost:3001/delete/${movieId}`;

    xhr.open('DELETE', endpoint, true);

    xhr.onload = () => {

        const res = JSON.parse(xhr.responseText);

        console.log(res);
    }

    xhr.send()

}