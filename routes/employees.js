var express = require('express');
var router = express.Router();
var EmployeeController = require('../controllers/EmployeeController');
var auth = require('../middlewares/auth')

router.get('/:companyId', auth(), EmployeeController.index);

router.get('/show/:id', auth(), EmployeeController.show);

router.get('/create/:companyId', auth(), EmployeeController.create);

router.post('/', auth(), EmployeeController.store);

router.get('/edit/:id', auth(), EmployeeController.edit);

router.patch('/:id', auth(), EmployeeController.update);

router.delete('/:id', auth(), EmployeeController.delete);

module.exports = router;
