var express = require('express');
var router = express.Router();
var EmployeeController = require('../controllers/EmployeeController');
var auth = require('../middlewares/auth')
var verified = require('../middlewares/verified')

router.get('/:companyId', auth(), verified(), EmployeeController.index);

router.get('/show/:id', auth(), verified(), EmployeeController.show);

router.get('/create/:companyId', auth(), verified(), EmployeeController.create);

router.post('/', auth(), verified(), EmployeeController.store);

router.get('/edit/:id', auth(), verified(), EmployeeController.edit);

router.patch('/:id', auth(), verified(), EmployeeController.update);

router.delete('/:id', auth(), verified(), EmployeeController.delete);

module.exports = router;
