var express = require('express');
var router = express.Router();
var User = require('../models/user')
var globals = require('../globals');

router.get('/', function(req, res) {
    res.render('account');
});

router.get('/reviews', function(req, res){
    res.render('account/reviews');
});

router.get('/history', function(req, res){
    res.render('account/history');
});

router.get('/settings', function(req, res){
    res.render('account/settings');
});

router.get('/:id', function(req, res){
    User.findById(req.params.id, function(err, user){
        globals.onError(res, err);
        res.render('account', {user : user});
    });
});

router.put('/', function(req, res) {
    User.findByIdAndUpdate(req.user._id, req.body.user, function(err, user){
        globals.onError(res, err);
        res.json(user);
    });
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
    })
})

module.exports = router;