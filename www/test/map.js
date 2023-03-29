backButton = document.querySelector("#homebtn");

backButton.onclick = function(){
    changePage("index.html");
}

function changePage(page){
    window.location.href = page;
}

function initMap(){
map = new google.maps.Map(document.getElementById('map'),{
center:{lat: -34.397, lng:150.644},
zoom: 8,
mapId: '5234eb0daf2277dd'
});
}

