var express = require('express');
var router = express.Router();
var EmployeeController = require('../controllers/EmployeeController');
var auth = require('../middlewares/auth')

router.get('/:companyId', auth(), EmployeeController.index);

router.get('/show/:id', auth(), EmployeeController.show);

router.get('/create/:companyId', auth(), EmployeeController.create);

router.get('/edit/:id', auth(), EmployeeController.edit);

module.exports = router;
