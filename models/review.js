const mongoose = require('mongoose');

var reviewSchema = new mongoose.Schema({
    title : String,
    content : String,
    rating : Number,
    image : {
        contentType : String,
        data : Buffer
    },
    author : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'user'
    },
    place : {
        id : {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'place'
        },
        name : String
    }
}, {
    timestamps: {
        createdAt: 'createdAt',
        updatedAt: 'updatedAt'
    }
});

module.exports = mongoose.model('review', reviewSchema);
