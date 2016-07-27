var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('Oops! Put in the id of the search query please.');
});

router.get('/:id', function(req, res, next){
	
	//fetch from search history from firebase
});



module.exports = router;
