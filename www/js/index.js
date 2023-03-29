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
            new_cell.setAttribute("onclick", "location.href='details.html'");
//            new_cell.setAttribute("onclick", "changeToDetailPage()");
            new_cell.setAttribute("value", data[i].Title_tc);
        }
    } else {
        for (var i = 0; i < data.length; i++){
            var new_row = tbody.insertRow();
            var new_cell = new_row.insertCell();
            var new_text = document.createTextNode(data[i].Title_en);
            new_cell.appendChild(new_text);
            new_cell.setAttribute("onclick", "location.href='details.html'");
//            new_cell.setAttribute("onclick", "changeToDetailPage()");
            new_cell.setAttribute("value", data[i].Title_en);
        }

    }

};

function changeToDetailPage(){



//     document.getElementById("test_label").innerHTML = text;

//     var tbody = document.getElementById("records_table");
//     var tr = getElementsByTagName("tr");

//     for (i = 0; i < tr.length; i++){

//         var currentRow = tbody.row[i];

//         document.getElementById("test_label").innerHTML = currentRow;
//     }


// //    document.getElementById("test_label").innerHTML = tr.textContent;

}

function search() {};

createLanguageType();

getFacilityData();

