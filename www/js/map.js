/**
 * Created by jamesjackson on 10/23/13.
 */
function onMapLoad() {
    if (isConnected) {
        var fileref=document.createElement('script');
        fileref.setAttribute("type", "text/javascript");
        fileref.setAttribute("src", "http://maps.googleapis.com/maps/api/js?sensor=true&callback=" + "getGeolocation");
            document.getElementsByTagName("head") [0].appendChild(fileref);
        }else {
            alert("Must be connected to the InterWebs!");
    }
}

function getGeolocation () {
    var options = {
        maximumAge: 3000,
        timeout: 5000,
        enableHighAccuracy: true
    };
    navigator.geolocation.getCurrentPosition(loadMap, geoError, options);
}

function loadMap (position) {
    var latlng = new google.maps.LatLng{
        position.coords.latitude, position.coords.longitude);

    var myOptions = {
        zoom: 8,
        center: latlng,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    var mapObj = document.getElementsById("map_canvas");
    var map = new google.maps.Map(mapObj, myOptions);

    var marker = new google.maps.Marker({
        position: latlng,
        map: map,
        title:"Here"
    });

    }
}

function geoError (error) {
    alert ('code: ' + error.code + '\n' + 'message: ' + error.message + '\n');
}

$(document).bind("pageload", onMapLoad);