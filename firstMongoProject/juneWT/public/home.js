//FUNCTIONS THAT CREATE HTML ELEMENTS
function createHeading(headingObj) {

    let heading = headingObj.size >= 1 && headingObj.size <= 5 ? document.createElement('h'+ headingObj.size) : document.createElement('h4');
 
    heading.innerText = (typeof headingObj.text == 'string') ? headingObj.text : 'no text';
 
    if (headingObj.id != undefined && document.getElementById(headingObj.id) == null) {
 
        heading.id = headingObj.id
        
    }
 
    return heading
    
 }
 
 function createImg(imageObj) {
 
    let image = document.createElement('img');
 
    image.src = imageObj.src != undefined ? imageObj.src : './img.jpeg';
 
    image.alt = imageObj.alt != undefined ? imageObj.alt : 'Image Could Not Load';
 
    if (imageObj.id != undefined && document.getElementById(imageObj.id) == null ) {
 
        image.id = imageObj.id;
        
    }
 
    if ( imageObj.class != undefined ) {
 
        image.className = imageObj.class;
        
    }
 
    return image 
 }
 
 function createDivElement(divObject) {
 
    //class and id
 
    const div = document.createElement('div');
 
    if (divObject.id != undefined && document.getElementById(divObject.id) == null) {
 
        div.id = divObject.id; 
        
    }
 
    if (divObject.class != undefined ) {
 
        div.className = divObject.class;
        
    }
 
    // console.log(div);
    
 
    return div
    
 }
 
 function createHyperLink(linkObject) {
 
    //class and id
 
    const link = document.createElement('a');
 
    if (linkObject.id != undefined && document.getElementById(linkObject.id) == null) {
 
        link.id = linkObject.id; 
        
    }
 
    if (linkObject.class != undefined ) {
 
        link.className = linkObject.class;
        
    }
 
    //property name openNewTab
 
    if (linkObject.openNewTab === true) {
        
     link.target = '_blank';
    }
 
    link.innerText = linkObject.text != undefined ? linkObject.text : 'Untitled Link';
 
    link.href = linkObject.hrefLink != undefined ? linkObject.hrefLink : 'No Link';
 
    // console.log(link);
    
 
    return link
    
 }
 
 function createInitalDivs() {
 
   let mainContainer = createDivElement({id: 'mainContainer'});
   
   let movieDisplays = createDivElement({id: 'movieDisplays'});
 
   let sideBar = createDivElement({id: 'sideBar'});
 
   let available = createDivElement({id: 'aDiv', class: 'movieDivs'});
 
   let rented = createDivElement({id: 'rDiv', class: 'movieDivs'});
 
 
 
    document.body.appendChild(mainContainer);
 
    mainContainer.appendChild(movieDisplays);
    mainContainer.appendChild(sideBar);
 
    movieDisplays.appendChild(available);
    movieDisplays.appendChild(rented);
 
 
 
 }
 
 function createSelectElement(selectObject) {
 
    //  console.log(selectObject);
 
     let select = document.createElement('select');
 
 
 
     //id
 
     if (selectObject.id != undefined && document.getElementById(selectObject.id) == null){
         select.id = selectObject.id;
     }
 
     //className
 
     if (selectObject.class != undefined) {
         select.className = selectObject.class;
     }
 
     let defaultOpt = document.createElement('option');
 
     defaultOpt.innerText = selectObject.defaultText == undefined ? 'Select An Option' : selectObject.defaultText; 
 
     defaultOpt.value = '';
     
     select.appendChild(defaultOpt);
 
 
  
 for (let i = 0; i < selectObject.array.length; i++) {
     
     let option = document.createElement('option');
 
     option.innerText = selectObject.array[i];
 
     option.value = selectObject.array[i];
     
     select.appendChild(option);
 }
     //optionally add a onchange property (link rent/return methods)
 
     return select;
     //return 
 }

window.onload = () => {

    const xhr = new XMLHttpRequest(), //making an instance of XML class
        endpoint = `${location}movie/all`; //Location includes a slash at the end of it

    xhr.open('GET', endpoint, true);

    xhr.onload = () => {

        const response = JSON.parse(xhr.responseText);

        //display data to DOM with functions
        displayMovies(response.movies);
    }
    xhr.send()
}

function displayMovies(allMovies){//Always an array, even if there is zero movies

    for (let i = 0; i < allMovies.length; i++) {

        const movieData = allMovies[i],

        singleMovieDiv = createDivElement({class: 'movies'}),

        movieImgDiv = createDivElement({class: 'movieImgDiv'}),

        movieTitle = createHeading({size: 2, text: movieData.title}),

        movieRD = createHeading({text: `Year Released ${movieData.release}`, size: 4}),

        IMDBlink = createHyperLink({hrefLink: movieData.imbdLink, text: movieData.title + ' IMDB Page', class: 'imbdlink'}),

        movieImage = createImg({class: 'movieImages', src: movieData.img, alt: movieData.title + ' Image'});

        singleMovieDiv.appendChild(movieTitle);

        singleMovieDiv.appendChild(movieImgDiv);

        singleMovieDiv.appendChild(movieRD);

        singleMovieDiv.appendChild(IMDBlink);

        document.body.appendChild(singleMovieDiv);

        movieImgDiv.appendChild(movieImage);
    }
}