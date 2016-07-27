var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('account/account');
});

router.get('/reviews', function(req, res, next){
	res.render('account/reviews');
});

router.get('/history', function(req, res, next){
	res.render('account/history');
});

router.get('/settings', function(req, res, next){
	res.render('account/settings');
});



module.exports = router;
