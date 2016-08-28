const express = require('express');
const router = express.Router();
const Image = require('../models/image');
const Place = require('../models/place');
const Blog = require('../models/blog');
const globals = require('../globals');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index');
});

router.get('/location', function(req, res, next){
    if(req.query.lng && req.query.lat) {
        var location = {
            location : {
                $near : {
                    $geometry : {
                        type : 'Point',
                        coordinates : [req.query.lng, req.query.lat]
                    },
                    $maxDistance : 10000
                }
            }
        };
        Place.find(location).exec(function(err, places){
            globals.onError(res, err);
            console.log(places);
            res.render('location',{places: places});
        });
    } else {
        res.render('location');
    }
});

router.get('/news', function(req, res){
    Blog.find({}, function (err, blogs) {
        res.render('newsfeed', blogs);
    });
});

router.get('/images/:id', function(req, res){
    Image.findById(req.params.id, function(err, image){
        globals.onError(res, err, 'Couldn\'t find image');
        res.contentType(image.contentType);
        res.send(image.data);
    });
});


module.exports = router;