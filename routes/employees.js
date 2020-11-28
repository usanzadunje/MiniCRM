var express = require('express');
var router = express.Router();
var EmployeeController = require('../controllers/EmployeeController');
var auth = require('../middlewares/auth')

router.get('/', auth(), function(req, res, next) {
  res.render('employees/index');
});

router.get('/show/:id', auth(), function(req, res, next) {
  let id = req.params.id;
  res.render('employees/show', {id});
});

router.get('/create', auth(), function(req, res, next) {
  res.render('employees/create');
});

router.get('/edit', auth(), function(req, res, next) {
  res.render('employees/create');
});

module.exports = router;
