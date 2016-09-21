var express = require('express');
var router = express.Router();
var Place = require('../models/place');
var globals = require('../globals');

router.get('/', function(req, res){
   Place.find({}, function(err, places){
       globals.onError(res, err);
       res.json(places);
   }) ;
});

router.get('/add', function(req, res){
    res.render('places/add');
});

router.post('/', function(req, res) {
    Place.create({
        name : req.body.name,
        type : req.body.type,
        description : req.body.description,
        reviews : req.body.review
    }, function(err, place){
        globals.onError(res, err);
        res.json(place);
    });
});
router.post('/:placeId', function(req, res){
    Place.findOne({placeId : req.params.placeId}, function(err, place){
        globals.onError(res, err);
        var review = {
            content : req.body.content,
            rating : req.body.rating,
            author : {
                name : req.user.google.displayName,
                image : req.user.google.image.url,
                id : req.user._id
            }
        };
        if(!place) {
            Place.create({
                name : req.body.name,
                types : req.body.types,
                location : {
                    type : 'Point',
                    coordinates : [req.body.lng, req.body.lat]
                },
                placeId : req.params.placeId
            }, function(err, place){
                globals.onError(res, err);
                place.reviews.push(review);
                place.save();
                res.json(place);
            });
        } else {
            place.reviews.push(review);
            place.save();
            res.json(place);
        }
    });
});
router.get('/map/:id', function(req, res){
    Place.findOne({placeId:req.params.id}).populate('reviews').exec(function(){
        globals.onError(res, err);
        res.json(place);
    });
});

router.get('/:id', function(req, res){
    Place.findById(req.params.id).populate('reviews').exec(function(err, place){
        globals.onError(res, err);
        res.json(place);
    });
});

module.exports = router;