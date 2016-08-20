const mongoose = require('mongoose');

var placeSchema = new mongoose.Schema({
    name : String,
    type : String,
    location : {
        type : {
            type : String,
            default : 'Point'
        },
        coordinates : [Number]
    },
    images : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'image'
    }],
    description : String,
    reviews : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'review'
    }]
}, {
    timeStamps : true
});

module.exports = mongoose.model('place', placeSchema);
