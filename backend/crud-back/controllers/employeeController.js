const Employee = require('../models/employee');
const Department = require('../models/department');

const getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.find().populate('department', 'name');
    res.status(200).json(employees);
  } catch (error) {
    console.error('Error fetching employees:', error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

const addEmployee = async (req, res) => {
  try {
    const { name, surname, department } = req.body;

    if (!name || !surname || !department) {
      return res.status(400).json({ message: 'Name, surname, and department are required' });
    }

    const trimmedName = name.trim();
    const trimmedSurname = surname.trim();
    const trimmedDepartment = department.trim();

    const departmentDoc = await Department.findOne({
      name: { $regex: new RegExp(`^${trimmedDepartment}$`, 'i') },
    });
    if (!departmentDoc) {
      return res.status(400).json({ message: 'Department not found' });
    }

    const checkEmployee = await Employee.findOne({
      name: trimmedName,
      surname: trimmedSurname,
      department: departmentDoc._id,
    });
    if (checkEmployee) {
      return res.status(409).json({
        message: 'Employee already exists',
      });
    }

    const newEmployee = new Employee({
      name: trimmedName,
      surname: trimmedSurname,
      department: departmentDoc._id,
    });
    await newEmployee.save();

    departmentDoc.employees.push(newEmployee._id);
    await departmentDoc.save();

    return res.status(201).json({
      message: 'Employee added successfully',
      employee: newEmployee,
    });
  } catch (error) {
    console.error('Error adding employee:', error);
    return res.status(500).json({
      message: 'Internal server error',
      error: error.message,
    });
  }
};

const getEmployeeById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: 'Employee ID is required' });
    }

    const employee = await Employee.findOne({ _id: id }).populate('department', 'name');
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    return res.status(200).json(employee);
  } catch (error) {
    console.error('Error fetching employee:', error);
    return res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

const updateEmployeeById = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, surname, department } = req.body;

    if (!name || !surname || !department) {
      return res.status(400).json({ message: 'Name, surname and department are required' });
    }

    const trimmedName = name.trim();
    const trimmedSurname = surname.trim();
    const trimmedDepartment = department.trim();

    const employee = await Employee.findById(id);
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    const departmentDoc = await Department.findOne({
      name: { $regex: new RegExp(`^${trimmedDepartment}$`, 'i') },
    });
    if (!departmentDoc) {
      return res.status(400).json({ message: 'Department not found' });
    }

    employee.name = trimmedName;
    employee.surname = trimmedSurname;
    employee.department = departmentDoc._id;

    await employee.save();

    return res.status(202).json({
      message: 'Employee updated successfully',
      employee,
    });
  } catch (error) {
    console.error('Error updating employee:', error);
    return res.status(500).json({
      message: 'Internal server error',
      error: error.message,
    });
  }
};

const deleteEmployeeById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: 'Employee ID is required' });
    }

    const employee = await Employee.findByIdAndDelete(id);
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    await Department.findByIdAndUpdate(employee.department, { $pull: { employees: id } });

    return res.status(200).json({
      message: 'Employee was deleted successfully',
      employee,
    });
  } catch (error) {
    console.error('Error deleting employee:', error);
    return res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

module.exports = {
  getAllEmployees,
  addEmployee,
  getEmployeeById,
  updateEmployeeById,
  deleteEmployeeById,
};
