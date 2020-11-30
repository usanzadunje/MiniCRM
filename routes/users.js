var express = require('express');
var router = express.Router();
var UserController = require('../controllers/UserController');
var auth = require('../middlewares/auth')

/* GET users listing. */
router.get('/show', auth(), UserController.show);

router.get('/edit', auth(), UserController.edit);

router.patch('/', auth(), UserController.update);

module.exports = router;
