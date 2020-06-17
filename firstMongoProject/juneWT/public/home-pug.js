console.log('logging test');

function clickedBtn() {
    console.log('test')
}

window.onload = () => {

    clickMe.onclick = clickedBtn;

    const getButtons = document.getElementsByClassName('getMovie')

    for (const button of getButtons) {button.onclick = reqSingleMovieData;}
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