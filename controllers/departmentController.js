const Department = require("../models/Department");
const User = require("../models/User");

const getDepartments = async (req, res) => {
  try {
    const departments = await Department.find().sort({ name: 1 });
    const result = await Promise.all(
      departments.map(async d => ({
        ...d.toObject(),
        employeeCount: await User.countDocuments({ department: d._id, role: "employee" })
      }))
    );
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getDepartments };