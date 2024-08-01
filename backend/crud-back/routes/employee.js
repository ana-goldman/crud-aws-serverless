const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employeeController');

router.get('/employees', employeeController.getAllEmployees);
router.post('/employees', employeeController.addEmployee);
router.get('/employees/:id', employeeController.getEmployeeById);
router.put('/employees/:id', employeeController.updateEmployeeById);
router.delete('/employees/:id', employeeController.deleteEmployeeById);

module.exports = router;
