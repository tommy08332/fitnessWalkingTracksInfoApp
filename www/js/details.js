// finish
// buttons
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

    var picture = document.getElementById("img_photo");
//
    if (language === "zh_hk"){

        picture.setAttribute("src", data.MapURL_tc);
        document.getElementById("locationData").innerHTML = "路徑 : " + data.Title_tc;
        document.getElementById("districtData").innerHTML = "分區 : " + data.District_tc;
        document.getElementById("routeData").innerHTML = data.Route_tc;
        document.getElementById("howToAccessData").innerHTML = "途徑 : " + data.HowToAccess_tc;

    } else {

        picture.setAttribute("src", data.MapURL_en);
        document.getElementById("locationData").innerHTML = "Title : " + data.Title_en;
        document.getElementById("districtData").innerHTML = "District : " + data.District_en;
        document.getElementById("routeData").innerHTML = data.Route_en;
        document.getElementById("howToAccessData").innerHTML = "How to Access : " + data.HowToAccess_en;

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
