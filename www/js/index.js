var language = "eng";

function getFacilityData() {

    const path = "facility-fw.json";

    fetch (path)
    .then(res => res.json())
    .then(data => {
        showRoute(data);

    });

};

function showRoute(jsonData){

    var tbody = document.getElementById("records_table")
                        .getElementsByTagName("tbody")[0];

//    const localStorage = window.localStorage;
//    if (localStorage) {
//
//        localStorage.setItem("Facility_Data", JSON.stringify());
//
//    }

//    document.getElementById("test_label").innerHTML = WalkingTracks;

    if (language === "zh_hk"){
        for (var i = 0; i < jsonData.length; i++){
            var new_row = tbody.insertRow();
            var new_cell = new_row.insertCell();
            var new_text = document.createTextNode(jsonData[i].Title_tc);
            new_cell.appendChild(new_text);
            new_cell.setAttribute("onclick", "location.href='details.html'");
            new_cell.setAttribute("value", i.toString());
        }
    } else {
        for (var i = 0; i < jsonData.length; i++){
            var new_row = tbody.insertRow();
            var new_cell = new_row.insertCell();
            var new_text = document.createTextNode(jsonData[i].Title_en);
            new_cell.appendChild(new_text);
            new_cell.setAttribute("onclick", "location.href='details.html'");
            new_cell.setAttribute("value", i.toString());
        }

    }

};

function search() {};

getFacilityData();
