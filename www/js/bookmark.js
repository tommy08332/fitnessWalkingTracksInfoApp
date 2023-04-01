const homeButton = document.querySelector("#homebtn"),
      mapButton = document.querySelector("#mapbtn"),
      langButton = document.querySelector("#lang_bttn"),
      bookmarkButton = document.querySelector("#bookmarkbtn");

bookmarkButton.onclick = function(){
    changePage("bookmark.html");
}

homeButton.onclick = function(){
    changePage("index.html");
}

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
    getBookmarkedRoute();

}

function createLanguageType() {

    const localStorage = window.localStorage;
    const language_type = localStorage.getItem("language_type");

    if (language_type){

        setText(language_type);

    } else {

        localStorage.setItem("language_type", "eng");
        getBookmarkedRoute();

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
        document.getElementById("headLbl").innerHTML = "書籤";
        document.getElementById("bookmark_th").innerHTML = "路徑"
        document.getElementById("map_text").innerHTML = "地圖";
        document.getElementById("bookmark_text").innerHTML = "書籤";
        document.getElementById("home_text").innerHTML = "主頁";
        document.getElementById("lang_text").innerHTML = "中文";

    } else {

        /// set text to english
        document.getElementById("headLbl").innerHTML = "Bookmark";
        document.getElementById("bookmark_th").innerHTML = "Title"
        document.getElementById("map_text").innerHTML = "Map";
        document.getElementById("bookmark_text").innerHTML = "Bookmark";
        document.getElementById("home_text").innerHTML = "Home";
        document.getElementById("lang_text").innerHTML = "English";
    }

};

function getBookmarkedRoute(){

    const localStorage = window.localStorage;
    const bookmark_item = localStorage.getItem("bookmark_item");

    if (bookmark_item) {

        var table = document.getElementById("bookmark_items");
        var tbody = table.getElementsByTagName("tbody");

        if (tbody.length != 0){
            tbody[0].parentNode.removeChild(tbody[0]);
        }

        table.appendChild(document.createElement("tbody"));
        var language = localStorage.getItem("language_type");

        var get_bookmark_item = JSON.parse(bookmark_item);

        if (language === "zh_hk"){
            for (var i = 0; i < get_bookmark_item.length; i++){

                var new_row = tbody[0].insertRow();
                var new_cell = new_row.insertCell();
                var new_text = document.createTextNode(get_bookmark_item[i].Title_tc);
                new_cell.appendChild(new_text);
                new_cell.setAttribute("onclick", "redirectDetailPage(this)");
            }
        } else {

            for (var i = 0; i < get_bookmark_item.length; i++){

                var new_row = tbody[0].insertRow();
                var new_cell = new_row.insertCell();
                var new_text = document.createTextNode(get_bookmark_item[i].Title_en);
                new_cell.appendChild(new_text);
                new_cell.setAttribute("onclick", "redirectDetailPage(this)");

            }

        }
    }
}

function redirectDetailPage(tableObj){

    const localStorage = window.localStorage;
    localStorage.removeItem("selected_facility");
    const bookmark_items = localStorage.getItem("bookmark_item");
    const language_type = localStorage.getItem("language_type");

    var bookmarks = JSON.parse(bookmark_items);

    for (var i of bookmarks){

        if (language_type === "zh_hk" &&
            i.Title_tc === tableObj.textContent){

            localStorage.setItem("selected_facility", JSON.stringify(i));
            break;

        } else if (language_type === "eng" &&
                   i.Title_en === tableObj.textContent){

            localStorage.setItem("selected_facility", JSON.stringify(i));
            break;

        }
    }

    changePage("details.html");

}

function changePage(page){
    window.location.href = page;
}

createLanguageType();

getBookmarkedRoute();
