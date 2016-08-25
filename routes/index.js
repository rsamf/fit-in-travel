const express = require('express');
const router = express.Router();
const Image = require('../models/image');
const Place = require('../models/place');
const globals = require('../globals');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index');
});

router.get('/location', function(req, res, next){
    var location = {
        location : {
            $near : {
                $geometry : {
                    type : 'Point',
                    coordinates : [req.query.lng, req.query.lat]
                }
            },
            maxDistance : 10000
        }
    };
    Place.find(location).exec(function(err, places){
        globals.onError(res, err);
        res.render('location',{places: places});
    })
});

router.get('/news', function(req, res){
    res.render('newsfeed');
});

router.get('/images/:id', function(req, res){
    Image.findById(req.params.id, function(err, image){
        globals.onError(res, err, 'Couldn\'t find image');
        res.contentType(image.contentType);
        res.send(image.data);
    });
});

router.get('/test', function(req, res){
    res.render('test-map');
});

module.exports = router;