var express = require('express');
var router = express.Router();
var CompanyController = require('../controllers/CompanyController');
var auth = require('../middlewares/auth')

router.get('/create', auth(), CompanyController.create);

router.post('/', auth(), CompanyController.store);

router.get('/edit/:id', auth(), CompanyController.edit);

router.patch('/:id', auth(), CompanyController.update);

router.delete('/:id', auth(), CompanyController.delete);

module.exports = router;