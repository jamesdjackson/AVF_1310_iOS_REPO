

$.getJSON("http://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?",
  {
    tags: "Bengal Cat",//my cats are Bengal Cats
    tagmode: "any",
    format: "json"
  },
  function(data) {
    $.each(data.items, function(i,item){
      
      $("<img/>").attr("src", item.media.m).appendTo("#data-output2");
      if ( i == 5 ) return false;
    });
  });

/*/////////////Instagram Code////////////////*/


var Instagram = {};

Instagram.Config = {
    clientID: '1f3b9cc46f204f5ab56bde659bbf2857',
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
            throw new Error("Cats Lulz!");
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
            }
        });
    }

    function showPhoto(p){
        $(p).fadeIn();
    }
    Instagram.App = {
        search: search,
        showPhoto: showPhoto,
        init: init
    };
}());


$(function(){
    Instagram.App.init();
    Instagram.App.search('jindo');//my dog is a Jindo
});


//Your token is: 38896705.ab103e5.6dafb2da12454f4cbf29ae03eea40b5e
//Your user ID is: 38896705
//clientID: '1f3b9cc46f204f5ab56bde659bbf2857'

