const mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    facebook : Object,
    reviews : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'review'
    }],
    blogger : true,
    blogs : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'blog'
    }]
}, {
    timeStamps : true
});

module.exports = mongoose.model('user', userSchema);
