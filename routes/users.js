const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Place = require('../models/place');
const globals = require('../globals');

router.get('/', function(req, res) {
    res.render('account');
});

router.get('/reviews', function(req, res){
    User.findById(req.user._id).populate('reviews').exec(function(err, user){
        globals.onError(res, err);
        res.render('account/reviews', {currentUser:user});
    });
});

router.get('/favorites', function(req, res){
    User.findById(req.user._id).populate('favPlaces').exec(function(err, user){
        globals.onError(res, err);
        res.render('account/favorites', {currentUser:user});
    });
});

router.get('/settings', function(req, res){
    res.render('account/settings');
});

router.get('/blogs', function(req, res){
    User.findById(req.user._id).populate('blogs').exec(function(err, user) {
        globals.onError(res, err);
        res.render('account/blogs', {currentUser: user});
    });
});

router.get('/:id', function(req, res){
    if(req.params.id === 'me') {
        res.render('account');
    } else {
        User.findById(req.params.id, function(err, user){
            globals.onError(res, err);
            res.render('account', {user : user});
        });
    }
});

router.put('/', function(req, res) {
    User.findByIdAndUpdate(req.user._id, req.body.user, function(err, user){
        globals.onError(res, err);
        res.json(user);
    });
});

router.put('/fav', globals.isLoggedIn, function(req, res) {
    console.log(req.body);
    if(req.body.fromG) {
        console.log('from G');
        Place.findOne({placeId : req.body.placeId}, function(err, place){
            globals.onError(res, err);
            if(place) {
                User.findById(req.user._id, function(err, user){
                    globals.onError(res, err);
                    user.favPlaces.push(place);
                    user.save();
                });
                res.json(place);
            } else {
                Place.create({
                    placeId : req.body.place_id,
                    location : {
                        coordinates : [req.body.lng, req.body.lat]
                    }
                }, function(err, place){
                    globals.onError(res, err);
                    User.findById(req.user._id, function(err, user){
                        globals.onError(res, err);
                        user.favPlaces.push(place);
                        user.save();
                    });
                    res.json(place);
                });
            }
        });
    } else {
        console.log('not from G');
        User.findById(req.body.placeId, function(err, user){
            globals.onError(res, err);
            user.favPlaces.push(req.body.placeId);
            user.save();
            res.json(req.body.placeId);
        });
    }
});

router.put('/:id', function(req, res){
    User.findByIdAndUpdate(req.params.id, req.body.user, function(err, user){
        globals.onError(res, err);
        res.json(user);
    });
});

router.delete('/:id', function(req, res){
    User.findByIdAndRemove(req.params.id, function(err){
        globals.onError(res, err);
        res.send('Deleted user ' + req.params.id);
    });
});

module.exports = router;
