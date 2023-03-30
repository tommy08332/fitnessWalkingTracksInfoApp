// finish
const homeButton = document.querySelector("#homebtn");
const mapButton = document.querySelector("#mapbtn");
const langButton = document.querySelector("#lang_bttn");


mapButton.onclick = function(){
    changePage("map.html");
}

homeButton.onclick = function(){
    changePage("index.html");
}

langButton.onclick = function (){

    let language = document.getElementById("lang_bttn").value;
    if (language === "zh_hk"){

        language = "eng";
    } else{
        language = "zh_hk";
    }

    document.getElementById("lang_bttn").value = language;
    setText(language);
    showSelectedRouteDetails();

}

function createLanguageType() {

    const localStorage = window.localStorage;
    const language_type = localStorage.getItem("language_type");

    if (language_type){

        setText(language_type);

    } else {

        localStorage.setItem("language_type", "eng");
        createLanguageType();

    }

};

function setText(language){

    const localStorage = window.localStorage;
    let language_type = localStorage.getItem("language_type");

    if (language_type !== language){

        localStorage.setItem("language_type", language);
        language_type = language;

    }

    console.log("language_type    ", language_type);

    if (language_type === "zh_hk"){
        console.log("language_type",  language_type);

        /// set picture

        /// set text to traditional chinese
        document.getElementById("headLbl").innerHTML = "地圖";
        document.getElementById("mapbtn").innerHTML = "地圖";
        document.getElementById("bookmarkbtn").innerHTML = "書籤";
        document.getElementById("homebtn").innerHTML = "主頁";
        document.getElementById("lang_bttn").innerHTML = "中文";

    } else {
        console.log("language_type",  language_type);
        /// set picture

        /// set text to english
        document.getElementById("headLbl").innerHTML = "Map";
        document.getElementById("mapbtn").innerHTML = "Map";
        document.getElementById("bookmarkbtn").innerHTML = "Bookmark";
        document.getElementById("homebtn").innerHTML = "Home";
        document.getElementById("lang_bttn").innerHTML = "ENGLISH";

    }

};


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


createLanguageType();
