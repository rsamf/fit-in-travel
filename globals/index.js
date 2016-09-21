module.exports = {
    onError : function(res, err, customMessage) {
        if(err) {
            var msg = {};
            msg.error = err;
            msg.message = customMessage;
            console.error(msg);
            if(res) res.send(msg);
        }
    },
    isLoggedIn : function(req, res, next){
        if(req.isAuthenticated()) {
            next();
        } else {
            res.redirect('/');
        }
    },
    doesExist : function(req, res, next) {
        Place.findOne({placeId : req.body.placeId}, function(err, place) {
            this.onError(res, err);
            if(place) {
                req.place = place;
                next();
            }
        });
    }
};