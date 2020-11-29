var express = require('express');
var router = express.Router();
var AuthController = require('../controllers/AuthController');
var CompanyController = require('../controllers/CompanyController');
var auth = require('../middlewares/auth')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('welcome', { data: JSON.stringify(req.session)});
});

router.get('/home', auth(), CompanyController.index);

//Auth routes
router.get('/login', AuthController.login);
router.post('/login', AuthController.login);
router.get('/register', AuthController.register);
router.post('/register', AuthController.register);
router.post('/logout', AuthController.logout);

module.exports = router;
