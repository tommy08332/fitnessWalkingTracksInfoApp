function createLanguageType() {

    const localStorage = window.localStorage;
    const language_type = localStorage.getItem("language_type");

    if (language_type){
//        setText("zh_hk");
        setText(language_type);

    } else {

        localStorage.setItem("language_type", "eng");
        createLanguageType();

    }

};

//// for init or onclick
function setText(language){

    const localStorage = window.localStorage;
    const language_type = localStorage.getItem("language_type");

    if (language_type !== language){

        localStorage.setItem("language_type", language);

    }

    if (language_type === "zh_hk"){

        /// set text and button to traditional chinese
//                document.getElementById("test_label").innerHTML = "language_type2";

    } else {

        /// set text and button to english

//                document.getElementById("test_label").innerHTML = "language_type3";
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

    var tbody = document.getElementById("records_table")
                        .getElementsByTagName("tbody")[0];

//    document.getElementById("test_label").innerHTML = WalkingTracks;

    var language = localStorage.getItem("language_type");

    if (language === "zh_hk"){
        for (var i = 0; i < data.length; i++){
            var new_row = tbody.insertRow();
            var new_cell = new_row.insertCell();
            var new_text = document.createTextNode(data[i].Title_tc);
            new_cell.appendChild(new_text);
            new_cell.setAttribute("onclick", "changeToDetailPage(this)");
        }
    } else {
        for (var i = 0; i < data.length; i++){
            var new_row = tbody.insertRow();
            var new_cell = new_row.insertCell();
            var new_text = document.createTextNode(data[i].Title_en);
            new_cell.appendChild(new_text);
            new_cell.setAttribute("onclick", "changeToDetailPage(this)");
        }

    }

};

function changeToDetailPage(tableObj){

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
    window.location.href = "details.html";

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

createLanguageType();

getFacilityData();

