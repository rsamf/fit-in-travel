var express = require('express');
var router = express.Router();
var Place = require('../models/place');
var Review = requier('../models/review');
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
        description : req.body.description
    }, function(err, place){
        globals.onError(res, err);
        res.json(place);
    });
});
router.post('/:placeId', function(req, res){
    Place.findOne({placeId : req.params.placeId}, function(err, place){
        globals.onError(res, err);
        Review.create({
            title : req.body.title,
            rating : req.body.rating,
            content : req.body.content,
            author : req.user,
            place : place
        }, function(err, review){
            globals.onError(res, err);
            if(!place) {
                Place.create({
                    placeId : req.params.placeId,
                    reviews : [req.body.review]
                }, function(err, place){
                    globals.onError(res, err);
                    review.place = place;
                    res.json(place);
                });
            } else {
                place.push(req.body.review);
                review.place = place;
                place.save();
                review.save();
                res.json(place);
            }
        });
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