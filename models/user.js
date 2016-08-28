const mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    google : Object,
    bio : String,
    reviews : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'review'
    }],
    favActivities : [String],
    favPlaces : [{
        id : mongoose.Schema.Types.ObjectId,
        ref : 'place'
    }],
    blogger : {
        type : Boolean,
        default : 'false'
    },
    blogs : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'blog'
    }]
}, {
    timestamps: {
        createdAt: 'createdAt',
        updatedAt: 'updatedAt'
    }
});

module.exports = mongoose.model('user', userSchema);
