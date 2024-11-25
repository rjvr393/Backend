const express = require('express');
const router = express.Router();
const Employee = require('../models/Employee');

// Get All Employees
router.get('/', async (req, res) => {
  try {
    const employees = await Employee.find();
    res.status(200).json(employees);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add New Employee
router.post('/', async (req, res) => {
  const { name, position, department, salary } = req.body;
  const newEmployee = new Employee({ name, position, department, salary });
  try {
    const savedEmployee = await newEmployee.save();
    res.status(201).json(savedEmployee);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update Employee
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, position, department, salary } = req.body;
  try {
    const updatedEmployee = await Employee.findByIdAndUpdate(
      id,
      { name, position, department, salary },
      { new: true }
    );
    res.status(200).json(updatedEmployee);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete Employee
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await Employee.findByIdAndDelete(id);
    res.status(200).json({ message: 'Employee deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
