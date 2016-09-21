/**
 * Created by Sam on 9/20/2016.
 */
var currentDetails = {};
function submitReview(){
    var form = document.getElementById('review-form');
    var dom = document.getElementById('review-list-byfit');
    var request = new XMLHttpRequest();
    request.open("POST", "/places/"+currentDetails.place_id);
    request.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var result = JSON.parse(request.responseText);
            var str = '';
            result.reviews.forEach(function (review) {
                str +=
                    '<div class="item">'+
                    '<div class="content">'+
                    '<div class="ui header">'+
                    (review.author.image ?
                        '<img src="'+review.author.image+'" alt="" class="ui avatar image">' : ''
                    )+
                    '<span>'+review.author.name+'</span>' +
                    '<div class="meta">'+
                    '<span title="'+review.rating+' stars" data-rating="'+Math.round(review.rating)+'" data-max-rating="5" class="ui star readonly rating"></span> '+
                    '</div>'+
                    '<div class="description">'+
                    '<p>'+review.content+'</p>'+
                    '</div>'+
                    '</div>'+
                    '</div>'
            });
            dom.innerHTML = str;
        }
    };
    var formData = new FormData(form);
    formData.append('rating' , 5);
    formData.append('name' , currentDetails.name);
    formData.append('types' , currentDetails.types);
    formData.append('lng', currentDetails.geometry.location.lng());
    formData.append('lat', currentDetails.geometry.location.lat());
    request.send(formData);
    form.reset();
}
function redirectToLogin(){
    window.location.assign('/auth/login');
}
function showAddForm(){
    $('#new.ui.modal').modal('show');
}
function setRailHtmlTo(html){
    document.getElementById('detail-display').innerHTML = html;
}
function showIsLoading(active){
    if(active)
        document.getElementsByClassName('dimmer')[0].classList.add('active');
    else
        document.getElementsByClassName('dimmer')[0].classList.remove('active');
}
function resetSemantic(){
    $('.ui.rating').rating();
    $('.ui.rating.readonly').rating('disable');
    $('.ui.accordion').accordion();
}

function showReviewModal(){
    console.log(currentDetails);
    console.log(currentDetails.fit);
    var reviewList = document.getElementById('review-list');
    var fitReviewList = document.getElementById('review-list-byfit');
    var placeOfReview = document.getElementById('place-of-review');
    var str = '';
    if(currentDetails.fit && currentDetails.fit.reviews) {
        currentDetails.fit.reviews.forEach(function (review) {
            str +=
                '<div class="item">'+
                '<div class="content">'+
                '<div>'+
                (review.author.image ?
                    '<img src="'+review.author.image+'" alt="" class="ui avatar image">' : ''
                )+
                '<span>'+review.author.name+'</span>' +
                '</div>'+
                '<div class="meta">'+
                '<span title="'+review.rating+' stars" data-rating="'+Math.round(review.rating)+'" data-max-rating="5" class="ui star readonly rating"></span> '+
                '</div>'+
                '<div class="description">'+
                '<p>'+review.content+'</p>'+
                '</div>'+
                '</div>'+
                '</div>'
        });
        fitReviewList.innerHTML = str;
        str = '';
    }
    if(currentDetails.reviews) {
        currentDetails.reviews.forEach(function(review){
            str +=
                '<div class="item">'+
                '<div class="content">'+
                '<a href="'+review.author_url+'" class="ui header">'+
                (review.profile_photo_url ? '<img src="'+review.profile_photo_url+'" alt="" class="ui avatar image">' : '')+'<span>'+review.author_name+'</span>' +
                '</a>'+
                '<div class="meta">'+
                '<span title="'+review.rating+' stars" data-rating="'+Math.round(review.rating)+'" data-max-rating="5" class="ui star readonly rating"></span> '+
                '<span class="date">'+ new Date(review.time).toDateString() +'</span>'+
                '</div>'+
                '<div class="description">'+
                '<p>'+review.text+'</p>'+
                '</div>'+
                '</div>'+
                '</div>'
        });
        reviewList.innerHTML = str;
    }
    if(!currentDetails.reviews && (currentDetails.fit && !currentDetails.fit.reviews)) {
        str += '<h2 class="ui header">No reviews yet.</h2>';
        reviewList.innerHTML = str;
    }
    if(currentDetails.reviews) {
        str =
            '<div class="ui items">' +
            '<div class="item">' +
            '<div class="ui small image">' +
            '<img src="' + currentDetails.photos[0].getUrl({
                maxWidth: 150,
                maxHeight: 150
            }) + '" alt="Place has no image">' +
            '</div>' +
            '<div class="content">' +
            '<div class="header">' +
            currentDetails.name +
            '</div>' +
            '<div class="meta">' +
            '<span>' + currentDetails.formatted_phone_number + '</span>' +
            '</div>' +
            '<div class="meta">' +
            '<span>' + currentDetails.formatted_address + '</span>' +
            '</div>' +
            (
                currentDetails.website ?
                    ('<div class="meta">' +
                    '<span><a href="' + currentDetails.website + '">' + currentDetails.website + '</a></span>' +
                    '</div>')
                    : ''
            ) +
            (
                currentDetails.rating ?
                    ('<div class="meta">' +
                    '<span class="ui star readonly rating" data-rating="' + Math.round(currentDetails.rating) + '" data-max-rating="5"></span>' +
                    '</div>')
                    : ''
            ) +
            '</div>' +
            '</div>' +
            '</div>'
        ;
        placeOfReview.innerHTML = str;
    }
    $('#review.ui.modal').modal('show');
    resetSemantic();

}

function addAsFav(){
    $.ajax({
        method : 'PUT',
        url : '/users/fav',
        timeout : 5000,
        data : {
            placeId : currentDetails.place_id,
            fromG : true,
            lng : currentDetails.geometry.location.lng(),
            lat : currentDetails.geometry.location.lat()
        },
        success : function(data) {
            console.log(data);
        },
        failure : function(){
            console.error("failed to favorite " + data);
        }
    });
}