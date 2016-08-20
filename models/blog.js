const mongoose = require('mongoose');

var blogSchema = new mongoose.Schema({
    content : String,
    author : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'user'
    },
    targetPlaces : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'place'
    }]
}, {
    timeStamps : true
});

module.exports = mongoose.model('blog', blogSchema);