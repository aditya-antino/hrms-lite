const Employee = require("../models/Employee");

exports.createEmployee = async (req, res) => {
  try {
    const { employeeId, name, email, department } = req.body;

    if (!employeeId || !name || !email || !department) {
      return res.status(400).json({
        error: "All fields are required"
      });
    }

    const exists = await Employee.findOne({
      $or: [{ employeeId }, { email }]
    });

    if (exists) {
      return res.status(400).json({
        error: "Employee already exists"
      });
    }

    const employee = await Employee.create({
      employeeId,
      name,
      email,
      department
    });

    res.status(201).json(employee);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getEmployees = async (req, res) => {
  try {
    const employees = await Employee.find();

    res.json(employees);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteEmployee = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);

    if (!employee) {
      return res.status(404).json({
        error: "Employee not found"
      });
    }

    await employee.deleteOne();

    res.json({ message: "Employee deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
