var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.send('respond with a company resource');
});

router.get('/create', function(req, res, next) {
  res.render('companies/create');
});

router.get('/edit', function(req, res, next) {
  res.render('companies/create');
});

module.exports = router;
