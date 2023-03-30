var facility_data = JSON.parse(window.localStorage.getItem("facility_data"));
console.log(facility_data);

var map = new google.maps.Map(document.getElementById("googleMap"), {
    zoom: 11, center: { lat: 22.327476, lng: 114.165243 }
});

var infowindow = new google.maps.InfoWindow();
let language_type = window.localStorage.getItem("language_type");
for (var i = 0; i < facility_data.length; i++) {
    var marker = new google.maps.Marker({
        position: { lat: facility_data[i].Latitude, lng: facility_data[i].Longitude },
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
                    consloe.log("Unknown lanuage type");
            }
            infowindow.setContent(content);
            infowindow.open(map, marker);
        }
    })(marker, i));
}