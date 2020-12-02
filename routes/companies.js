var express = require('express');
var router = express.Router();
var CompanyController = require('../controllers/CompanyController');
var auth = require('../middlewares/auth')
var verified = require('../middlewares/verified')

router.get('/create', auth(), verified(), CompanyController.create);

router.post('/', auth(), verified(), CompanyController.store);

router.get('/edit/:id', auth(), verified(), CompanyController.edit);

router.patch('/:id', auth(), verified(), CompanyController.update);

router.delete('/:id', auth(), verified(), CompanyController.delete);

module.exports = router;