const LeaveRequest = require("../models/LeaveRequest");

const getStats = async (req, res) => {
  try {
    const employeeId = req.params.employeeId;

    if (req.user.role === "employee" && req.user.id !== employeeId) {
      return res.status(403).json({ message: "Access denied" });
    }

    const leaves = await LeaveRequest.find({ employee: employeeId });

    const approved = leaves.filter(l => l.status === "Approved");
    const pending = leaves.filter(l => l.status === "Pending");

    const usedLeaves = approved.reduce((sum, l) => sum + l.totalDays, 0);

    res.json({
      totalRequests: leaves.length,
      usedLeaves,
      pendingRequests: pending.length,
      approvedRequests: approved.length,
      rejectedRequests: leaves.filter(l => l.status === "Rejected").length
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getStats };