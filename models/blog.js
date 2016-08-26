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
    timestamps: {
        createdAt: 'createdAt',
        updatedAt: 'updatedAt'
    }
});

module.exports = mongoose.model('blog', blogSchema);