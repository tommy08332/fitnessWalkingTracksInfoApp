// finish
const homeButton = document.querySelector("#homebtn");
const mapButton = document.querySelector("#mapbtn");
const langButton = document.querySelector("#lang_bttn");

mapButton.onclick = function(){
    changePage("map.html");
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
        document.getElementById("headLbl").innerHTML = "詳細信息";
        document.getElementById("mapbtn").innerHTML = "地圖";
        document.getElementById("bookmarkbtn").innerHTML = "書籤";
        document.getElementById("homebtn").innerHTML = "主頁";
        document.getElementById("lang_bttn").innerHTML = "中文";

    } else {
        console.log("language_type",  language_type);
        /// set picture

        /// set text to english
        document.getElementById("headLbl").innerHTML = "Details";
        document.getElementById("mapbtn").innerHTML = "Map";
        document.getElementById("bookmarkbtn").innerHTML = "Bookmark";
        document.getElementById("homebtn").innerHTML = "Home";
        document.getElementById("lang_bttn").innerHTML = "ENGLISH";

    }

};

// finish
function showSelectedRouteDetails(){

    const localStorage = window.localStorage;

    var language = localStorage.getItem("language_type");

    var data = localStorage.getItem("selected_facility");

    data = JSON.parse(data);

    console.log("showSelectedRouteDetails   ",data);

    if (language === "zh_hk"){

        console.log("Title ",data.Title_tc);
        console.log("District ",data.District_tc);
        console.log("Route ",data.Route_tc);
        console.log("How to Access", data.HowToAccess_tc);
        console.log("Map URL", data.MapURL_tc);

    } else {

        console.log("Title ",data.Title_en);
        console.log("District ",data.District_en);
        console.log("Route ",data.Route_en);
        console.log("How to Access", data.HowToAccess_en);
        console.log("Map URL", data.MapURL_en);

    }

};


homeButton.onclick = function(){
    changePage("index.html");
}

// finish
function changePage(page){
    window.location.href = page;
}

// finish
document.addEventListener("backbutton", function () {

    changePage("index.html");

});


createLanguageType();

showSelectedRouteDetails();
