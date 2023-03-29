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

    document.getElementById("lang_bttn").value = language;
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

    if (language_type !== language){

        localStorage.setItem("language_type", language);
        language_type = language;

    }

    console.log("language_type    ", language_type);

    if (language_type === "zh_hk"){

        /// set picture

        /// set text to traditional chinese
        document.getElementById("headLbl").innerHTML = "健步行徑";
        document.getElementById("mapbtn").innerHTML = "地圖";
        document.getElementById("bookmarkbtn").innerHTML = "書籤";
        document.getElementById("searchbtn").innerHTML = "搜尋";
        document.getElementById("lang_bttn").innerHTML = "中文";

    } else {

        /// set picture

        /// set text to english
        document.getElementById("headLbl").innerHTML = "Fitness Walking Tracks";
        document.getElementById("mapbtn").innerHTML = "Map";
        document.getElementById("bookmarkbtn").innerHTML = "Bookmark";
        document.getElementById("searchbtn").innerHTML = "Search";
        document.getElementById("lang_bttn").innerHTML = "ENGLISH";

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
    var tr = tbody.getElementsByTagName("tr");

    for(var i =0; tr.length;i++){
         td = tr[i].getElementsByTagName("td")[0] ;
            if(td){
                var txtValue = td.textContent || td.innerText;
                if(txtValue.toUpperCase().indexOf(filter) >-1){
                        tr[i].style.display = "";
                    }else{
                       tr[i].style.display = "none";
                    }
            }

    }

};

//nav bar code here

//search button
function show_hide_searchbar(){
    var hidesearch = document.getElementById("middle-part");
    var shorttable = document.getElementsByClassName("tableFixHead");

    //hides search bar
     if (hidesearch.style.display === "none") {
        hidesearch.style.display = "block";
      }else {
           hidesearch.style.display = "none";
      }

    //extend and none extend the table so that search bar have space to show up
       if (shorttable.style.height === "420px") {
          shorttable.style.height = "380px";
        }else {
             shorttable.style.height = "420px";
        }
}


function changePage(page){

    window.location.href = page;

}


createLanguageType();

getFacilityData();
