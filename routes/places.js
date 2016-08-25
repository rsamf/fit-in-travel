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

router.get('/map/:id', function(req, res){
    Place.findOne({placeId:req.params.id}).populate('reviews').exec(function(){
        globals.onError(res, err);
        res.json(place);
    });
});

router.get('/:id', function(req, res){
    Place.findById(req.params.id, function(err, place){
        globals.onError(res, err);
        res.json(place);
    });
});

module.exports = router;