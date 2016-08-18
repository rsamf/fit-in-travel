const mongoose = require('mongoose');

var imageSchema = new mongoose.Schema({
    name : String,
    data : Buffer,
    contentType : String
}, {
    timeStamps : true
});

module.exports = mongoose.model('image', imageSchema);