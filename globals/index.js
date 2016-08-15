module.exports = {
    state : {

    },
    onError : function(res, err, customMessage) {
        if(err) {
            var msg = {};
            msg.error = err;
            msg.message = customMessage;
            console.error(msg);
            if(res) res.send(msg);
        }
    }
};