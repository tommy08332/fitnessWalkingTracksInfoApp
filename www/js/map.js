//google map
function showMap(facility_data) {

    var map = new google.maps.Map(document.getElementById("googleMap"), {
        zoom: 11, center: { lat: 22.327476, lng: 114.165243 }
    });

    var infowindow = new google.maps.InfoWindow();
    let language_type = window.localStorage.getItem("language_type");
    for (var i = 0; i < facility_data.length; i++) {
        var marker = new google.maps.Marker({
            position: { lat: checkLatNumber(facility_data[i].Latitude), lng: facility_data[i].Longitude },
            map,
            animation: google.maps.Animation.DROP
        });
        google.maps.event.addListener(marker, 'click', (function (marker, i) {
            return function () {
                var content;
                switch (language_type) {
                    case "zh_hk":
                        content = '<div id="content">' +
                            '<div id="Site">' +
                            '</div>' +
                            '<h1>' + facility_data[i].Title_tc + '</h1>' +
                            '<div id="BodyContent">' +
                            '<p>' + facility_data[i].Route_tc + '</p>' +
                            '</div>';
                        break;
                    case "eng":
                        content = '<div id="content">' +
                            '<div id="Site">' +
                            '</div>' +
                            '<h1>' + facility_data[i].Title_en + '</h1>' +
                            '<div id="BodyContent">' +
                            '<p>' + facility_data[i].Route_en + '</p>' +
                            '</div>';
                        break;
                    default:

                }
                infowindow.setContent(content);
                infowindow.open(map, marker);
            }
        })(marker, i));
    }
};

function checkLatNumber(lat){
    switch(typeof lat){
        case "number":
            return lat;
        case "string":
            return Number(lat.split(",")[0]);
    }
}

//get facility data
function getFacilityData() {

    const localStorage = window.localStorage;
    const facility_data = localStorage.getItem("facility_data");

    if (facility_data) {

        var facilities = JSON.parse(facility_data)
        showMap(facilities);

    } else {

        const path = "facility-fw.json";

        fetch(path)
            .then(res => res.json())
            .then(data => {

                localStorage.setItem("facility_data", JSON.stringify(data));

            });

    }

};



//bottom bar
const homeButton = document.querySelector("#homebtn");
const bookButton = document.querySelector("#bookmarkbtn");
const langButton = document.querySelector("#lang_bttn");

homeButton.onclick = function(){
    changePage("index.html");
}
bookButton.onclick = function(){
    changePage("bookmark.html");
}

langButton.onclick = function () {

    let language = document.getElementById("lang_bttn").value;
    switch(language){
        case "zh_hk":
            language = "eng";
            break;
        case "eng":
            language = "zh_hk";
            break;
        default:
            language = "eng";
    }
    setText(language);
    getFacilityData();

}

function createLanguageType() {

    const localStorage = window.localStorage;
    const language_type = localStorage.getItem("language_type");

    if (language_type) {

        setText(language_type);

    } else {

        localStorage.setItem("language_type", "eng");

        createLanguageType();

    }


};


function setText(language) {

    const localStorage = window.localStorage;
    let language_type = localStorage.getItem("language_type");
    langButton.value = language;

    if (language_type !== language) {

        localStorage.setItem("language_type", language);
        language_type = language;

    }

    if (language_type === "zh_hk") {

        /// set picture

        /// set text to traditional chinese
        document.getElementById("headLbl").innerHTML = "健步行徑";
        document.getElementById("map_text").innerHTML = "地圖";
        document.getElementById("bookmark_text").innerHTML = "書籤";
        document.getElementById("home_text").innerHTML = "主頁";
        document.getElementById("lang_text").innerHTML = "中文";

    } else {

        /// set picture

        /// set text to english
        document.getElementById("headLbl").innerHTML = "Fitness Walking Tracks";
        document.getElementById("map_text").innerHTML = "Map";
        document.getElementById("bookmark_text").innerHTML = "Bookmark";
        document.getElementById("home_text").innerHTML = "Home";
        document.getElementById("lang_text").innerHTML = "English";
    }

};

function changePage(page){

    window.location.href = page;

};

createLanguageType();

getFacilityData();
