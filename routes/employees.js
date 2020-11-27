var express = require('express');
var router = express.Router();
var EmployeeController = require('../controllers/EmployeeController');

router.get('/', function(req, res, next) {
  res.render('employees/index');
});

router.get('/show/:id', function(req, res, next) {
  let id = req.params.id;
  res.render('employees/show', {id});
});

router.get('/create', function(req, res, next) {
  res.render('employees/create');
});

router.get('/edit', function(req, res, next) {
  res.render('employees/create');
});

module.exports = router;
