const homeButton = document.querySelector("#homebtn"),
      mapButton = document.querySelector("#mapbtn"),
      langButton = document.querySelector("#lang_bttn"),
      addBookButton = document.querySelector("#bookbtn"),
      bookmarkbtn = document.querySelector("#bookmarkbtn");

mapButton.onclick = function(){
    changePage("map.html");
}

bookmarkbtn.onclick = function(){
    changePage("bookmark.html");
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

addBookButton.onclick = function (){

    if (isBookmarked()){

        removeBookmark();
        setBookmarkBttnColor(false);

    } else{

        addBookmark();
        setBookmarkBttnColor(true);
    }

}

function isBookmarked(){

    const localStorage = window.localStorage;
    var bookmark_item = JSON.parse(localStorage.getItem("bookmark_item"));
    var current_data = JSON.parse(localStorage.getItem("selected_facility"));

    if (bookmark_item) {

        for (var i = 0; i < bookmark_item.length; i++){

            if (bookmark_item[i].Title_en === current_data.Title_en){

                return true;

            }
        }
    }

    return false;

}

function setBookmarkBttnColor(result){

    var bookmark_color_change = document.getElementById("bookbtn");
//    bookmark_color_change.style.color = "#919191";

    if (result){

        bookmark_color_change.style.color = "white";

    } else {

        bookmark_color_change.style.color = "#919191";

    }

}

function addBookmark() {

    const localStorage = window.localStorage;
    var current_data = JSON.parse(localStorage.getItem("selected_facility"));
    var bookmark_item = JSON.parse(localStorage.getItem("bookmark_item"));
    var bookmark_arr = [];

    var isStored = false;

    if (bookmark_item){

        for (var i = 0; i < bookmark_item.length; i++){

            if (bookmark_item[i].Title_en === current_data.Title_en){

                isStored = true;

            } else{

                bookmark_arr.push(bookmark_item[i]);

            }

        }

        if (!isStored){

            localStorage.removeItem("bookmark_item");
            bookmark_arr.push(current_data);
            localStorage.setItem("bookmark_item", JSON.stringify(bookmark_arr));

        }

    } else {

          bookmark_arr.push(current_data);
          localStorage.setItem("bookmark_item", JSON.stringify(bookmark_arr));

    }

}

function removeBookmark() {

    const localStorage = window.localStorage;
    var current_data = JSON.parse(localStorage.getItem("selected_facility"));
    var bookmark_item = JSON.parse(localStorage.getItem("bookmark_item"));
    var bookmark_arr = [];

    if (bookmark_item){

        for (var i = 0; i < bookmark_item.length; i++){

            if (bookmark_item[i].Title_en !== current_data.Title_en){

                bookmark_arr.push(bookmark_item[i]);

            }

        }
        localStorage.removeItem("bookmark_item");
        localStorage.setItem("bookmark_item", JSON.stringify(bookmark_arr));

    }


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
    langButton.value = language;

    if (language_type !== language) {

        localStorage.setItem("language_type", language);
        language_type = language;

    }

    if (language_type === "zh_hk") {

        /// set text to traditional chinese
        document.getElementById("headLbl").innerHTML = "詳細信息";
        document.getElementById("map_text").innerHTML = "地圖";
        document.getElementById("bookmark_text").innerHTML = "書籤";
        document.getElementById("home_text").innerHTML = "主頁";
        document.getElementById("lang_text").innerHTML = "中文";

    } else {

        /// set text to english
        document.getElementById("headLbl").innerHTML = "Details";
        document.getElementById("map_text").innerHTML = "Map";
        document.getElementById("bookmark_text").innerHTML = "Bookmark";
        document.getElementById("home_text").innerHTML = "Home";
        document.getElementById("lang_text").innerHTML = "English";
    }

};


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


function changePage(page){
    window.location.href = page;
}

document.addEventListener("backbutton", function () {

    changePage("index.html");

});

var result = isBookmarked();

setBookmarkBttnColor(result);

createLanguageType();

showSelectedRouteDetails();
