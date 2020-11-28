var express = require('express');
var router = express.Router();
var UserController = require('../controllers/UserController');
var auth = require('../middlewares/auth')

/* GET users listing. */
router.get('/', auth(), UserController.index);

module.exports = router;
