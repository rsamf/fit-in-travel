const mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    google : Object,
    bio : String,
    reviews : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'review'
    }],
    favActivities : [String],
    searches : [{
        query : String,
        results : [Object],
        createdAt : Number
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
