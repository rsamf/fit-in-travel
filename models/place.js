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
    }],
    placeId : String
}, {
    timestamps: {
        createdAt: 'createdAt',
        updatedAt: 'updatedAt'
    }

});

placeSchema.index({location:'2dsphere'});

module.exports = mongoose.model('place', placeSchema);
