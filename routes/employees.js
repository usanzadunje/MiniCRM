var express = require('express');
var router = express.Router();
var EmployeeController = require('../controllers/EmployeeController');
var auth = require('../middlewares/auth')
var verified = require('../middlewares/verified')
var admin = require('../middlewares/admin');

router.get('/:companyId', auth(), verified(), EmployeeController.index);

router.get('/show/:id', auth(), verified(), EmployeeController.show);

router.get('/create/:companyId', auth(), verified(), admin(), EmployeeController.create);

router.post('/', auth(), verified(), admin(), EmployeeController.store);

router.get('/edit/:id', auth(), verified(), admin(), EmployeeController.edit);

router.patch('/:id', auth(), verified(), admin(), EmployeeController.update);

router.delete('/:id', auth(), verified(), admin(), EmployeeController.delete);

module.exports = router;
