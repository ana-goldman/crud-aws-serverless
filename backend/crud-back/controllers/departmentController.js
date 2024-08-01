const Department = require('../models/department');

const getAllDepartments = async (req, res) => {
  try {
    const departments = await Department.find();
    res.status(200).json(departments);
  } catch (error) {
    console.error('Error fetching departments:', error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

const addDepartment = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ message: 'Please enter a name of department' });
    }

    const trimmedName = name.trim();

    const checkDepartment = await Department.findOne({
      name: { $regex: new RegExp(`^${trimmedName}$`, 'i') },
    });
    if (checkDepartment) {
      return res.status(409).json({
        message: 'Department already exists',
      });
    }

    const newDepartment = new Department({ name: trimmedName });
    await newDepartment.save();

    return res.status(201).json({
      message: 'Department added successfully',
      department: newDepartment,
    });
  } catch (error) {
    console.error('Error creating department:', error);
    return res.status(500).json({
      message: 'Internal server error',
      error: error.message,
    });
  }
};

const getDepartmentById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: 'Department ID is required' });
    }

    const department = await Department.findOne({ _id: id });
    if (!department) {
      return res.status(404).json({ message: 'Department not found' });
    }

    return res.status(200).json(department);
  } catch (error) {
    console.error('Error fetching department:', error);
    return res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

const updateDepartmentById = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ message: 'Please enter a name of department' });
    }

    const trimmedName = name.trim();

    const checkDepartment = await Department.findOne({
      name: { $regex: new RegExp(`^${trimmedName}$`, 'i') },
    });

    if (checkDepartment && checkDepartment._id !== id) {
      return res.status(409).json({ message: 'Department name already exists' });
    }

    const updatedDepartment = await Department.findByIdAndUpdate(
      id,
      { name: trimmedName },
      { new: true },
    );

    if (!updatedDepartment) {
      return res.status(404).json({ message: 'Department not found' });
    }

    return res.status(200).json({
      message: 'Department updated successfully',
      department: updatedDepartment,
    });
  } catch (error) {
    console.error('Error updateing department:', error);
    return res.status(500).json({
      message: 'Internal server error',
      error: error.message,
    });
  }
};

const deleteDepartmentById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: 'Department ID is required' });
    }

    const department = await Department.findById(id);
    if (!department) {
      return res.status(404).json({ message: 'Department not found' });
    }

    if (department.employees.length > 0) {
      return res.status(404).json({
        message: 'Cannot delete department as it has employees attached. Remove employees first.',
      });
    }

    await Department.deleteOne({ _id: id });

    return res.status(200).json({
      message: 'Department was deleted successfully',
      department,
    });
  } catch (error) {
    console.error('Error deleting department:', error);
    return res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

module.exports = {
  getAllDepartments,
  addDepartment,
  getDepartmentById,
  updateDepartmentById,
  deleteDepartmentById,
};
