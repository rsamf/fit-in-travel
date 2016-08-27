var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
});

router.get('/:name', function(req, res, next){
    var image = require('../public/images/icons/' + req.params.name);
    res.contentType('image/png');
    res.send(image)

});



module.exports = router;