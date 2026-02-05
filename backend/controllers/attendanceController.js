const Attendance = require("../models/Attendance");
const Employee = require("../models/Employee");

exports.markAttendance = async (req, res) => {
  try {
    const { employeeId, date, status } = req.body;
    console.log("Req.body ",req.body)

    if (!employeeId || !date || !status) {
      return res.status(400).json({
        error: "All fields are required"
      });
    }

    const employee = await Employee.findById(employeeId);
    console.log("Emp ",employee)

    if (!employee) {
      return res.status(404).json({
        error: "Employee not found"
      });
    }

    const attendance = await Attendance.create({
      employee: employee._id,
      date,
      status
    });

    res.status(201).json(attendance);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAttendance = async (req, res) => {
  try {
    const records = await Attendance.find({
      employee: req.params.id
    }).populate("employee", "name employeeId");

    res.json(records);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
