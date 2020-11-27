var express = require('express');
var router = express.Router();
var AuthController = require('../controllers/AuthController');
var CompanyController = require('../controllers/CompanyController');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/home', CompanyController.index);

//Auth routes
router.get('/login', AuthController.login);
router.post('/login', AuthController.login);
router.get('/register', AuthController.register);
router.post('/register', AuthController.register);

module.exports = router;
