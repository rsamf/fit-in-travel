const mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    facebook : object,
    reviews : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'review'
    }]
}, {
    timeStamps : true
});

module.exports = mongoose.model('user', userSchema);
