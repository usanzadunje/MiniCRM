var express = require('express');
var router = express.Router();
var CompanyController = require('../controllers/CompanyController');

router.get('/create', CompanyController.create);

router.post('/', CompanyController.store);

router.get('/edit/:id', CompanyController.edit);

router.patch('/:id', CompanyController.edit);

module.exports = router;
