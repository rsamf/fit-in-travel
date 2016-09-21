var activityDOM = document.getElementById('activities');
var bioDOM = document.getElementById('bio');
var result = {};
var request = new XMLHttpRequest();

function updateActivity(){
    var formData = new FormData(document.querySelector('.ui.form#activity-form'));
    formData.append('method', 'add');
    request.open("PUT", 'users?favActivities=true');
    request.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            result = JSON.parse(request.responseText);
            updateUI('activity');
        }
    };
    request.send(formData);
    document.getElementById('activity-input').value = "";
}
function removeActivity(index){
    request.open("PUT", 'users?favActivities=true');
    var formData = new FormData();
    formData.append('method', 'remove');
    formData.append('activity', index);
    request.onreadystatechange = function(){
        if (this.readyState == 4 && this.status == 200) {
            result = JSON.parse(request.responseText);
            updateUI('activity');
        }
    };
    request.send(formData);

}

function updateBio(){
    var formData = new FormData(document.querySelector('.ui.form#bio-form'));
    request.open("PUT", 'users');
    request.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            result = JSON.parse(request.responseText);
            updateUI('bio');
        }
    };
    request.send(formData);
}


function updateUI(type){
    //activities
    if(type == 'activity'){
        var html = '';
        result.favActivities.forEach(function(f, i){
            html += '<div class="ui segment">'+f+'<span class="pull-right" onclick="removeActivity('+i+')"><i class="icon remove"></i></span></div>';
        });
        activityDOM.innerHTML = html;
    }
    //bio
    if(type == 'bio'){
        bioDOM.innerHTML = result.bio;
    }
}


var menuDOM = [
    document.getElementById('menu-prof'),
    document.getElementById('menu-rev'),
    document.getElementById('menu-fav'),
    document.getElementById('menu-blog'),
    document.getElementById('menu-settings')
];
switch(location.pathname){
    case '/users' :
        menuDOM[0].classList.add('active');
        break;
    case '/users/reviews' :
        menuDOM[1].classList.add('active');
        break;
    case '/users/favorites' :
        menuDOM[2].classList.add('active');
        break;
    case '/users/blogs' :
        menuDOM[3].classList.add('active');
        break;
    case '/users/settings' :
        menuDOM[4].classList.add('active');
        break;
}