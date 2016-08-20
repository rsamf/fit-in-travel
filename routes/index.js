const express = require('express');
const router = express.Router();
const Image = require('../models/image');
const globals = require('../globals');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/location', function(req, res, next){
    res.render('location');
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

module.exports = router;