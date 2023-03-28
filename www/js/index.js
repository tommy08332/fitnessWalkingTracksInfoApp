var language;

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

//    // for test
//    language = "";

    switch (language) {

        case "zh_hk":
            for (var i = 0; i < jsonData.length; i++){

                var new_row = tbody.insertRow();
                var new_cell = new_row.insertCell();
                var new_text = document.createTextNode(jsonData[i].Title_tc);
                new_cell.appendChild(new_text);
                new_cell.setAttribute("onclick", "location.href='details.html'");
                new_cell.setAttribute("value", i.toString());

            }
            break;
        case "zh_cn":
            for (var i = 0; i < jsonData.length; i++){

                var new_row = tbody.insertRow();
                var new_cell = new_row.insertCell();
                var new_text = document.createTextNode(jsonData[i].Title_sc);
                new_cell.appendChild(new_text);
                new_cell.setAttribute("onclick", "location.href='details.html'");
                new_cell.setAttribute("value", i.toString());
            }
            break;
        default:
            for (var i = 0; i < jsonData.length; i++){

                var new_row = tbody.insertRow();
                var new_cell = new_row.insertCell();
                var new_text = document.createTextNode(jsonData[i].Title_en);
                new_cell.appendChild(new_text);
                new_cell.setAttribute("onclick", "location.href='details.html'");
                new_cell.setAttribute("value", i.toString());
            }
            break;
    }

};

function search() {};

getFacilityData();
