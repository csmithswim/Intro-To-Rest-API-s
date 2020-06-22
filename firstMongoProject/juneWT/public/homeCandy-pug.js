function clickedBtn() {
    console.log('test')
}

function clickedDltBtn() {

}
window.onload = () => {
    reqSingleCandyData.onclick = clickedBtn;

    deleteSingleCandy.onclick = clickedDltBtn;

    const getButtons = document.getElementsByClassName('getCandy') //A method of the DOM that returns an iterable object.

    for (const button of getButtons) {button.onclick = reqSingleCandyData;}//Iterates through the object, setting the onclick property of an element in a class of elements.

    const getDltButtons = document.getElementsByClassName('deleteCandy')

    for (const button of getDltButtons) {button.onclick = deleteSingleCandy;}
}

function reqSingleCandyData () {

    console.log(this);
    const candyId = this.parentElement.id; 

        endpoint = `http://localhost:3001/candy/${candyId}`

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
function deleteSingleCandy() {

    const candyId = this.parentElement.id;

    console.log(candyId);
    
      xhr = new XMLHttpRequest();

    endpoint = `http://localhost:3001/candy/delete/${candyId}`;

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




