const mongoose = require('mongoose');

var placeSchema = new mongoose.Schema({
    name : String,
    types : [String],
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
    placeId : String,
    rating : {
        value : Number,
        count : Number
    },
    reviews : [{
        content: String,
        rating: Number,
        author: {
            id : mongoose.Schema.Types.ObjectId,
            name : String,
            image : String
        }
    }]
}, {
    timestamps: {
        createdAt: 'createdAt',
        updatedAt: 'updatedAt'
    }

});

placeSchema.index({location:'2dsphere'});
placeSchema.index({placeId : 1});

module.exports = mongoose.model('place', placeSchema);
