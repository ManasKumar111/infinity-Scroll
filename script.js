const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');
let ready=false;
let imagesLoaded=0;
let totalImages=0;
let photosArray = [];
let initialCount = 30;
const apiKey = 'XMu_Nyg2w4dZYw_VCWyzIrBEV8ui9zzJO2duqLaq7EU';
let apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${initialCount}`;
let isInitialLoad=true;

// new function
function updateAPIURLwithNewcount(picCount){
    apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${picCount}`;
}
// check if all images are loaded or not 
function imageLoaded(){
       
    imagesLoaded++;
    
    if(imagesLoaded===totalImages){
        ready=true;
        loader.hidden=true;
    }
}
        
        
        
// Helper function to setAttributes for DOM elements
function setAttributes(element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
}
// Create Elements for Links & Photos,add to DOM
function displayPhotos() {
    imagesLoaded=0;
    totalImages=photosArray.length;
    
    // Run function for each object in photoArray
    photosArray.forEach((photo) => {
        //Create <a> to link to unsplash
        const item = document.createElement('a');
        // item.setAttribute('href',photo.links.html) ;
        // item.setAttribute('target','_blank');
        setAttributes({
            href: photo.links.html,
            target: '_blank',
        });
        // Create image for photo
        const img = document.createElement('img');

        // img.setAttribute('alt', photo.alt_description);
        // img.setAttribute('src', photo.urls.regular);
        // img.setAttribute('title', photo.alt_description);
        setAttributes(img,{
            alt:photo.alt_description,
            src:photo.urls.regular,
            title:photo.alt_description,
        })
        // Event Listener checks when each is finished loading 
        img.addEventListener('load',imageLoaded)
        item.appendChild(img);
        imageContainer.appendChild(item);

    });
}

//Unsplash API


// Get photos from unsplash API
async function getPhotos() {
    try {
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos();
        if(isInitialLoad){
            updateAPIURLwithNewcount(30);
            isInitialLoad=false;
        }
        // console.log(photosArray);
    } catch (error) {
       //Catch the error here
    }
}
// Check to see if scrolling near the bottom of page ,Load more photos 
window.addEventListener('scroll',() =>{
    if(window.innerHeight+window.scrollY >=document.body.offsetHeight-1000 && ready){
        ready=false;
        getPhotos();    
        
    }
});
// onload
getPhotos();