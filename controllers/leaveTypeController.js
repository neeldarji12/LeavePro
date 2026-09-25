const LeaveType = require("../models/LeaveType");

const getLeaveTypes = async (req, res) => {
  try {
    const types = await LeaveType.find({ status: "active" }).sort({ code: 1 });
    res.json(types);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getLeaveTypes };