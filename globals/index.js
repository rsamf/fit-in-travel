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
            res.send('User is not authenticated');
        }
    }
};