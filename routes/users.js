var express = require('express');
var router = express.Router();
var UserController = require('../controllers/UserController');
var auth = require('../middlewares/auth')
var verified = require('../middlewares/verified')

/* GET users listing. */
router.get('/show', auth(), verified(), UserController.show);

router.get('/edit', auth(), verified(), UserController.edit);

router.patch('/', auth(), verified(), UserController.update);

module.exports = router;
