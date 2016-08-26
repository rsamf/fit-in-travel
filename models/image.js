const mongoose = require('mongoose');

var imageSchema = new mongoose.Schema({
    name : String,
    data : Buffer,
    contentType : String
}, {
    timestamps: {
        createdAt: 'createdAt',
        updatedAt: 'updatedAt'
    }
});

module.exports = mongoose.model('image', imageSchema);