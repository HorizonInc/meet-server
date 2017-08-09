var map, place_id, lat, lng;

$.get("/addressGet", (place) => {
    place.lat = lat;
    place.lng = lng;
    place.placeId = place_id;
});

function initMap() {
    map = new google.maps.Map(document.getElementById("map") , {
        center: {lat: 51.5074, lng: 0.1278},
        zoom: 10
    });
}

var animationSpeed = 250;

$(document).ready(function() {
    $("#menu").click(() => {
        $("#side_nav").animate({left:"0"}, animationSpeed);
    });
});
