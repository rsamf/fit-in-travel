var pathname = window.location.pathname;
var indexSiteButton = $(".ui.top.menu a.index"),
	feedSiteButton = $(".ui.top.menu a.feed"),
	locationSiteButton = $(".ui.top.menu a.location");

function showMapOnHomePage(position){
	var map = $("#map");
	if(map) {
	    var myPosition = position.coords.latitude + "," + position.coords.longitude;
		map.html("<iframe width='450' height='450' frameborder='0' style='border:0' allowfullscreen src='https://www.google.com/maps/embed/v1/place?key=AIzaSyA9jr8SZ6wWV461F94ayBntzyrfRu5-cXw&q=fitness'></iframe>");
	}
}
function getLocation() {
    if (navigator.geolocation) {
    	navigator.geolocation.getCurrentPosition(showMapOnHomePage);
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}


//*Note removing classes may be unnecessary
if(pathname.includes('/feed')) {
	feedSiteButton.addClass('active');
} else if(pathname.includes('/location')) {
	locationSiteButton.addClass('active');
} else {
	indexSiteButton.addClass('active');
	//getLocation();
}

$('.ui.radio.checkbox')
  .checkbox()
;
$('.ui.accordion')
  .accordion()
;
$('.ui.card .image').dimmer({
  on: 'hover'
});