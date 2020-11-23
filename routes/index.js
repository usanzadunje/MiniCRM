var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/home', function(req, res, next) {
  res.render('home');
});

var quotes = {
  'einstein' : 'einstein',
  'berners-lee': 'tim berners-lee',
  'crockford': 'crockford',
  'ray-crock': 'ray-crock'
}

router.get('/quotes', (req, res) => {
  var name = req.query.name;
  var quote = quotes[name];
  console.log(req.query);
  
})

module.exports = router;
