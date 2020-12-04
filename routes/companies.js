var express = require('express');
var router = express.Router();
var CompanyController = require('../controllers/CompanyController');
var auth = require('../middlewares/auth');
var verified = require('../middlewares/verified');
var admin = require('../middlewares/admin');

router.get('/create', auth(), verified(), admin(), CompanyController.create);

router.post('/', auth(), verified(), admin(), CompanyController.store);

router.get('/edit/:id', auth(), verified(), admin(), CompanyController.edit);

router.patch('/:id', auth(), verified(), admin(), CompanyController.update);

router.delete('/:id', auth(), verified(), admin(), CompanyController.delete);

module.exports = router;