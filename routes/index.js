var express = require('express');
var router = express.Router();
var AuthController = require('../controllers/AuthController');
var CompanyController = require('../controllers/CompanyController');
var EmailVerificationController = require('../controllers/EmailVerificationController');
var auth = require('../middlewares/auth')
var verified = require('../middlewares/verified')
var passport = require("passport")
var admin = require('../middlewares/admin');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('welcome', { data: JSON.stringify(req.session) });
});

router.get('/home', auth(), verified(), CompanyController.index);

//Auth routes
router.get('/login', AuthController.login);
router.post('/login', AuthController.login);
router.get('/register', AuthController.register);
router.post('/register', AuthController.register);
router.post('/logout', auth(), AuthController.logout);

//Passport routes
router.get("/auth/facebook", passport.authenticate("facebook"));
router.get("/auth/facebook/callback", passport.authenticate("facebook", { failureRedirect: "/login" }), AuthController.facebookLogin);

//E-mail verification rotes
//da prikaze poruku za neverifikovanog usera i verified middleware ce da redirect na ovu adresu
router.get('/email/verify', auth(), EmailVerificationController.verificationNotice);
//ruta koja salje e-mail
router.post('/email/verification-notification', auth(), EmailVerificationController.verificationSend)
//ruta koja ce da bude generisana kada user klikne na verification link
router.get('/email/verify/:id/:hash', auth(), EmailVerificationController.verificationVerifyc)


module.exports = router;
