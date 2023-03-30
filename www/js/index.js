//map button code ends here
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

    
    setText(language);
    getFacilityData();

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

    if (language_type !== language){

        localStorage.setItem("language_type", language);
        language_type = language;

    }

    console.log("language_type    ", language_type);

    if (language_type === "zh_hk"){

        /// set picture

        /// set text to traditional chinese
        document.getElementById("headLbl").innerHTML = "健步行徑";
        document.getElementById("map_text").innerHTML = "地圖";
        document.getElementById("bookmark_text").innerHTML = "書籤";
        // document.getElementById("search_text").innerHTML = "搜尋";
        // document.getElementById("home_text").innerHTML = "主頁";
        document.getElementById("lang_text").innerHTML = "中文";
        document.getElementById("search_input_field").placeholder = "搜尋位置";
        document.getElementById("search_bttn").innerHTML = "搜尋";
        if(document.getElementById("search_text") != null){
            document.getElementById("search_text").innerHTML = "搜尋";
        }
        if(document.getElementById("home_text") != null){
            document.getElementById("home_text").innerHTML = "主頁";
        }

    } else {

        /// set picture

        /// set text to english
        document.getElementById("headLbl").innerHTML = "Fitness Walking Tracks";
        document.getElementById("map_text").innerHTML = "Map";
        document.getElementById("bookmark_text").innerHTML = "Bookmark";
        // document.getElementById("search_text").innerHTML = "Search";
        // document.getElementById("home_text").innerHTML = "Home";
        document.getElementById("lang_text").innerHTML = "ENGLISH";
        document.getElementById("search_input_field").placeholder = "Search location";
        document.getElementById("search_bttn").innerHTML = "Search";
        if(document.getElementById("search_text") != null){
            document.getElementById("search_text").innerHTML = "Search";
        }
        if(document.getElementById("home_text") != null){
            document.getElementById("home_text").innerHTML = "Home";
        }
    }

};

// finish
function getFacilityData() {

    const localStorage = window.localStorage;
    const facility_data = localStorage.getItem("facility_data");

    if (facility_data){

        var facilities = JSON.parse(facility_data)
        showRoute(facilities);

    }else{

        const path = "facility-fw.json";

        fetch (path)
        .then(res => res.json())
        .then(data => {

            localStorage.setItem("facility_data", JSON.stringify(data));

        });

    }

};

// finish
function showRoute(data){

    var table = document.getElementById("records_table");
    var tbody = table.getElementsByTagName("tbody");

    if (tbody.length != 0){
        tbody[0].parentNode.removeChild(tbody[0]);
    }

    table.appendChild(document.createElement("tbody"));
    var language = localStorage.getItem("language_type");

    if (language === "zh_hk"){
        for (var i = 0; i < data.length; i++){
            var new_row = tbody[0].insertRow();
            var new_cell = new_row.insertCell();
            var new_text = document.createTextNode(data[i].Title_tc);
            new_cell.appendChild(new_text);
            new_cell.setAttribute("onclick", "redirectDetailPage(this)");
        }
    } else {
        for (var i = 0; i < data.length; i++){
            var new_row = tbody[0].insertRow();
            var new_cell = new_row.insertCell();
            var new_text = document.createTextNode(data[i].Title_en);
            new_cell.appendChild(new_text);
            new_cell.setAttribute("onclick", "redirectDetailPage(this)");
        }

    }

};

function redirectDetailPage(tableObj){

//    document.getElementById("test_label").innerHTML = text.textContent;
    const localStorage = window.localStorage;
    localStorage.removeItem("selected_facility");
    const facility_data = localStorage.getItem("facility_data");
    const language_type = localStorage.getItem("language_type");

    var facilities = JSON.parse(facility_data);

    for (var i of facilities){

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

function search() {

var input = document.getElementById("search_input_field");
    var filter = input.value.toUpperCase();
    var tbody = document.getElementById("records_table");

    for(var row of tbody.rows){
        for(cell of row.cells){
            if(cell.innerHTML.toUpperCase().indexOf(filter) >-1){
                cell.style.display = "";
            }else{
                cell.style.display = "none";
             }
        }
    }
    var searchbtn = document.getElementById("searchbtn");

    const localStorage = window.localStorage;
    let language_type = localStorage.getItem("language_type");

    if (language_type === "zh_hk"){

        searchbtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-house-door-fill" viewBox="0 0 16 16"><path d="M6.5 14.5v-3.505c0-.245.25-.495.5-.495h2c.25 0 .5.25.5.5v3.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5Z"/></svg><div id="home_text">主頁</div>';

    } else{

        searchbtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-house-door-fill" viewBox="0 0 16 16"><path d="M6.5 14.5v-3.505c0-.245.25-.495.5-.495h2c.25 0 .5.25.5.5v3.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5Z"/></svg><div id="home_text">Home</div>';

    }
//    var searchbtn = document.getElementById("searchbtn");
//    searchbtn.setAttribute("onclick", "searchReset()");

};

//nav bar code here

//search button
function show_hide_searchbar(){
    console.log("show hide search bar");
    var hidesearch = document.getElementById("middle-part");

    //hides search bar
     if (hidesearch.style.display == "none") {
        hidesearch.style.display = "block";
      }else {
      if(document.getElementById("home_text") != null){
        var searchbtn = document.getElementById("searchbtn");

          const localStorage = window.localStorage;
          let language_type = localStorage.getItem("language_type");

          if (language_type === "zh_hk"){
              searchbtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16"><path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" /></svg><div id="search_text">搜尋</div>';
          } else{
              searchbtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16"><path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" /></svg><div id="search_text">Search</div>';
          }
          getFacilityData();
      }
           hidesearch.style.display = "none";
      }

}

//function searchReset(){
//
//    var hidesearch = document.getElementById("middle-part");
//    hidesearch.style.display = "none";
//
//    createLanguageType();
//    getFacilityData();
//
//    var searchbtn = document.getElementById("searchbtn");
//    search_bttn.setAttribute("onclick", "show_hide_searchbar()");
//
//    document.getElementById("search_input_field").innerHTML = "";
//
//}


function changePage(page){

    window.location.href = page;

}



createLanguageType();

getFacilityData();

