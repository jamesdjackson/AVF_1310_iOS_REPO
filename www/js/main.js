

$.getJSON("http://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?",
  {
    tags: "cat",
    tagmode: "any",
    format: "json"
  },
  function(data) {
    $.each(data.items, function(i,item){
      
      $("<img/>").attr("src", item.media.m).appendTo("#data-output2");
      if ( i == 5 ) return false;
    });
  });

////////////////////////////////////////////////////////////////////////////////////

// Instantiate an empty object.
var Instagram = {};


// Small object for holding important configuration data.
Instagram.Config = {
    clientID: 'a307c0d0dada4b77b974766d71b72e0e',
    apiHost: 'https://api.instagram.com'
};



(function(){
    var photoTemplate, resource;


    function init(){
        bindEventHandlers();
        photoTemplate = _.template($('#photo-template').html());
    }


    function toTemplate(photo){
        photo = {
            count: photo.likes.count,
            avatar: photo.user.profile_picture,
            photo: photo.images.low_resolution.url,
            url: photo.link
        };


        return photoTemplate(photo);
    }


    function toScreen(photos){
        var photos_html = '';


        $('.paginate a').attr('data-max-tag-id', photos.pagination.next_max_id)
            .fadeIn();


        $.each(photos.data, function(index, photo){
            photos_html += toTemplate(photo);
        });


        $('div#photos-wrap').append(photos_html);
    }


    function generateResource(tag){
        var config = Instagram.Config, url;


        if(typeof tag === 'undefined'){
            throw new Error("Resource requires a tag. Try searching for cats.");
        } else {
            tag = String(tag).trim().split(" ")[0];
        }


        url = config.apiHost + "/v1/tags/" + tag + "/media/recent?callback=?&client_id=" + config.clientID;


        return function(max_id){
            var next_page;
            if(typeof max_id === 'string' && max_id.trim() !== '') {
                next_page = url + "&max_id=" + max_id;
            }
            return next_page || url;
        };
    }


    function paginate(max_id){
        $.getJSON(generateUrl(tag), toScreen);
    }


    function search(tag){
        resource = generateResource(tag);
        $('.paginate a').hide();
        $('#photos-wrap *').remove();
        fetchPhotos();
    }


    function fetchPhotos(max_id){
        $.getJSON(resource(max_id), toScreen);
    }


    function bindEventHandlers(){
        $('body').on('click', '.paginate a.btn', function(){
            var tagID = $(this).attr('data-max-tag-id');
            fetchPhotos(tagID);
            return false;
        });

        $('form').on('submit', function(e){

            e.preventDefault();

            var tag = $('input.search-tag').val().trim();

            if(tag) {
                search(tag);
            };


        });
    }

    function showPhoto(p){
        $(p).fadeIn();
    }
    // Public API
    Instagram.App = {
        search: search,
        showPhoto: showPhoto,
        init: init
    };
}());


$(function(){
    Instagram.App.init();

    Instagram.App.search('cats');
});


//Your token is: 38896705.ab103e5.6dafb2da12454f4cbf29ae03eea40b5e
//Your user ID is: 38896705

var watchID = null;
document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
    startWatch();
}

function startWatch() {

    var options = { frequency: 2000 };

    watchID = navigator.compass.watchHeading(onSuccess, onError, options);
}

function stopWatch() {
    if (watchID) {
        navigator.compass.clearWatch(watchID);
        watchID = null;
    }
}
function onSuccess(heading) {
    var element = document.getElementByID('heading');
    element.innerHTML = 'Heading; ' + heading;
}

function onError() {
    alert('Not Tracking!');
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function onLoad() {
    document.addEventListener("deviceready", onDeviceReady, false);
}

function onDeviceReady() {
}

function showAlert() {
    navigator.notification.alert(
        'Game Over!',  // message
        alertCallback,   //callback
        'Game Over',            // title
        'Done'                  // buttonName
    );
}


function alertCallback(){
}


function onConfirm(button) {
    alert('You selected button ' + button);
}


function showConfirm() {
    navigator.notification.confirm(
        'Game Over!',  // message
        onConfirm,     // callback to invoke with index of button pressed
        'Game Over',   // title
        'Restart,Exit' // buttonLabels
    );
}
function playBeep() {
    navigator.notification.beep(2);
}
function vibrate() {
    navigator.notification.vibrate(4000);
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

var watchID = null;

document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
    startWatch();
}

function startWatch() {

    var options = { frequency: 3000 };

    watchID = navigator.accelerometer.watchAcceleration(onSuccess, onError,
        options);
}

function stopWatch() {
    if (watchID) {
        navigator.accelerometer.clearWatch(watchID);
        watchID = null;
    }
}


function onSuccess(acceleration) {
    var element = document.getElementById('accelerometer');
    element.innerHTML = 'Acceleration X: ' + acceleration.x + '<br />' +
        'Acceleration Y: ' + acceleration.y + '<br />' +
        'Acceleration Z: ' + acceleration.z + '<br />' +
        'Timestamp: '      + acceleration.timestamp + '<br />';
}
function onError() {
    alert('oooops!');
}



//////////////////////////////////////////////////////////////////////////////////////////

app.controller('mash1Ctrl', function ($scope) {
               
               $scope.geoMash = function(position) {
               $scope.latitude = position.coords.latitude;
               $scope.longitude = position.coords.longitude;
               };
               
               });

