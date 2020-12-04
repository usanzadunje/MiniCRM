var express = require('express');
var router = express.Router();
var UserController = require('../controllers/UserController');
var auth = require('../middlewares/auth')
var verified = require('../middlewares/verified')
var admin = require('../middlewares/admin');

/* GET users listing. */
router.get('/', auth(), verified(), admin(), UserController.index);

router.post('/make-admin/:id', auth(), verified(), admin(), UserController.makeAdmin);

router.post('/verify-email/:id', auth(), verified(), admin(), UserController.manualEmailVerification);

router.get('/show', auth(), verified(), UserController.show);

router.get('/edit', auth(), verified(), UserController.edit);

router.patch('/', auth(), verified(), UserController.update);

module.exports = router;
