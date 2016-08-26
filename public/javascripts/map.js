var map,
    myMarker,
    myInfoWindow,
    myCoords,
    service,
    currentInfoWindow,
    currentPlace,
    currentDetails,
    places = [],
    requests = [],
    enabledTypes = [true, true, false];
const maxRadius = '10000',
    myLocDom = 'You are here',
    types = ['gym', 'park', 'spa'];
function initMap() {
    //Set up map and origin
    getMyCoords();
    map = new google.maps.Map(document.getElementById('map'), {
        center: myCoords,
        zoom: 14
    });
    myInfoWindow = new google.maps.InfoWindow({
        content: myLocDom
    });
    myMarker = new google.maps.Marker({
        position: myCoords,
        map : map,
        animation: google.maps.Animation.DROP,
        title: myLocDom,
        icon : '/images/icons/fa-user.png'
    }).addListener('click', function() {
        if(currentInfoWindow) currentInfoWindow.close();
        myInfoWindow.open(map, this);
        currentInfoWindow = this.infoWindow;
    });

    //Set up targets in surrounding origin
    getRequests();
    service = new google.maps.places.PlacesService(map);
    for(var reqIndex = 0; reqIndex < requests.length; reqIndex++) {
        service.nearbySearch(requests[reqIndex], function(results, status){
            if (status == google.maps.places.PlacesServiceStatus.OK) {
                placeDown(results, places);
            } else {
                console.error('Status not ok \n' + status);
            }
        });
    }


}

function placeDown(obj, cache){
    if(obj.length) {
        for (var i = 0; i < obj.length; i++) {
            var point = new google.maps.Marker({
                position : obj[i].geometry.location,
                map : map,
                animation : google.maps.Animation.DROP,
                title : obj[i].name
            });
            point.infoWindow = new google.maps.InfoWindow({
                content : getPlaceDom(obj[i])
            });
            point.place_id = obj[i].place_id;
            if(cache) {
                point.addListener('click', function(){
                    currentPlace = this.place_id;
                    if(currentInfoWindow) currentInfoWindow.close();
                    this.infoWindow.open(map, this);
                    currentInfoWindow = this.infoWindow;
                });
                cache.push(point);
            }
        }
    } else {
        var point = new google.maps.Marker({
            position : obj.geometry.location,
            map : map,
            animation : google.maps.Animation.DROP,
            title : obj.name
        });
        point.infoWindow = new google.maps.InfoWindow({
            content : getPlaceDom(obj)
        });
        point.place_id = obj.place_id;
        if(cache) {
            point.addListener('click', function(){
                currentPlace = this.place_id;
                if(currentInfoWindow) currentInfoWindow.close();
                this.infoWindow.open(map, this);
                currentInfoWindow = this.infoWindow;
            });
            cache.push(point);
        }
    }
}

function getMyCoords(){
    myCoords = {
        lat: 34.2491550,
        lng: -119.0704070
    };
}

function getRequests(){
    for(var i = 0; i < types.length; i++){
        if(enabledTypes[i]) {
            requests.push({
                location : myCoords,
                radius : maxRadius,
                type : types[i]
            });
        }
    }
}

function getPlaceDom(place){
    var isOpen;
    if(place.opening_hours) {
        isOpen = place.opening_hours.open_now ? 'Open now' : 'Closed';
    }
    return (
        '<div class="ui list">'+
            '<div class="item">'+
                '<div class="content">'+place.name+'</div>'+
            '</div>'+
            '<div class="item">'+
                '<i class="marker icon"></i>'+
                '<div class="content">'+place.vicinity+'</div>'+
            '</div>'+
            (
                isOpen !== undefined ?
                    ('<div class="item">'+
                        '<i class="wait icon"></i>'+
                        '<div class="content">'+ isOpen +'</div>'+
                    '</div>') : ''
            ) +
            '<div class="item">'+
                '<div class="content"><button class="ui basic button blue" onclick="display()">More details</button></div>'+
            '</div>'+
        '</div>'
    );
}

function display(){
    if(currentPlace){
        window.parent.showIsLoading(true);
        service.getDetails({placeId : currentPlace}, function(place, status) {
            if (status == google.maps.places.PlacesServiceStatus.OK) {
                window.parent.showIsLoading(false);
                currentDetails = place;
                var html =
                    '<div class="ui left attached internal rail">'+
                        '<div style="width:100%;height:100%" class="ui segment">'+
                            '<button title="Helps to review later" class="basic ui pull-right button"><i class="star icon yellow"></i> Add as favorite</button>'+
                            '<div class="ui dividing header">'+place.name+'</div>' +
                            (
                                place.photos && place.photos[0] ?
                                    ('<img class="ui image" src="'+place.photos[0].getUrl({maxWidth:300, maxHeight:300})+'">') : ''
                            ) +
                            '<div class="ui list">'+
                                '<div class="item">'+
                                    '<i class="call icon"></i>'+
                                    '<div class="content">'+place.formatted_phone_number+'</div>'+
                                '</div>'+
                                '<div class="item">'+
                                    '<i class="marker icon"></i>'+
                                    '<div class="content">'+
                                        //TODO
                                        '<a title="Get directions from Google Maps" href="https://www.google.com/maps/dir/543+Deseo+Avenue,+Camarillo,+CA/'+place.formatted_address+'">'+
                                            place.formatted_address+
                                        '</a>'+
                                    '</div>'+
                                '</div>'+
                                    (
                                        place.rating ?
                                            ('<div class="item">'+
                                                '<i class="google icon" title="Rating by Google Places"></i>'+
                                                '<div class="content">'+
                                                    '<div class="ui star rating" data-rating="'+Math.round(place.rating)+'" data-max-rating="5"></div>'+
                                                '</div>'+
                                            '</div>') : ''
                                    ) +
                                '<div class="item">'+
                                    getOpeningHours(place)+
                                '</div>'+
                            '</div>'+
                            '<a href="#reviews" onclick="showReviewModal()"">View reviews</a>'+
                        '</div>'+
                    '</div>'
                ;
                window.parent.currentDetails = currentDetails;
                console.log(currentDetails);
                window.parent.setRailHtmlTo(html);
                window.parent.resetSemantic();
            }
        });
    }
    function getOpeningHours(place){
        var str = '';
        if (place.opening_hours) {
            str += '<i class="wait icon"></i><div class="content">';
            var openNow = place.opening_hours.open_now;
            var hours = place.opening_hours.weekday_text;
            if (openNow !== undefined) {
                str += openNow ? 'Open now' : 'Closed';
            }
            if (hours !== undefined) {
                str += '<div class="list">';
                for (var i = 0; i < hours.length; i++) {
                    str +=
                        '<div class="item">' +
                            hours[i] +
                        '</div>'
                    ;
                }
                str += '</div>';
            }
            str += '</div>';
        }
        return str;
    }
}