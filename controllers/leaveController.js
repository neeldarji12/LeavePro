const LeaveRequest = require("../models/LeaveRequest");
const LeaveType = require("../models/LeaveType");

const calculateDays = (start, end, halfDay) => {
  const s = new Date(start);
  const e = new Date(end);
  s.setHours(0,0,0,0);
  e.setHours(0,0,0,0);
  return Math.floor((e - s) / 86400000) + 1 - (halfDay ? 0.5 : 0);
};

const getLeaves = async (req, res) => {
  try {
    const filter = {};
    if (req.user.role === "employee") filter.employee = req.user.id;

    const leaves = await LeaveRequest.find(filter)
      .populate("employee", "name email role")
      .populate("leaveType", "name code annualLimit")
      .populate("approvedBy", "name email")
      .sort({ createdAt: -1 });

    res.json(leaves);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getLeave = async (req, res) => {
  try {
    const leave = await LeaveRequest.findById(req.params.id)
      .populate("employee", "name email role")
      .populate("leaveType", "name code annualLimit")
      .populate("approvedBy", "name email");

    if (!leave) return res.status(404).json({ message: "Leave request not found" });

    if (req.user.role === "employee" && String(leave.employee._id) !== req.user.id) {
      return res.status(403).json({ message: "Access denied" });
    }

    res.json(leave);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createLeave = async (req, res) => {
  try {
    const { leaveType, startDate, endDate, reason, halfDay } = req.body;

    if (!leaveType || !startDate || !endDate || !reason) {
      return res.status(400).json({ message: "All required fields must be filled" });
    }

    if (new Date(endDate) < new Date(startDate)) {
      return res.status(400).json({ message: "End date cannot be earlier than start date" });
    }

    const type = await LeaveType.findById(leaveType);
    if (!type) return res.status(404).json({ message: "Leave type not found" });

    const totalDays = calculateDays(startDate, endDate, !!halfDay);
    if (totalDays <= 0) {
      return res.status(400).json({ message: "Invalid leave duration" });
    }

    const leave = await LeaveRequest.create({
      employee: req.user.id,
      leaveType,
      startDate,
      endDate,
      totalDays,
      reason,
      halfDay: !!halfDay
    });

    const populated = await LeaveRequest.findById(leave._id)
      .populate("employee", "name email")
      .populate("leaveType", "name code annualLimit");

    res.status(201).json(populated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateLeaveStatus = async (req, res, status) => {
  try {
    const leave = await LeaveRequest.findById(req.params.id);
    if (!leave) return res.status(404).json({ message: "Leave request not found" });

    if (leave.status !== "Pending") {
      return res.status(400).json({ message: "Only pending requests can be changed" });
    }

    leave.status = status;
    leave.approvedBy = req.user.id;
    await leave.save();

    const updated = await LeaveRequest.findById(leave._id)
      .populate("employee", "name email")
      .populate("leaveType", "name code annualLimit")
      .populate("approvedBy", "name email");

    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const approveLeave = (req, res) => updateLeaveStatus(req, res, "Approved");
const rejectLeave = (req, res) => updateLeaveStatus(req, res, "Rejected");

const getBalance = async (req, res) => {
  try {
    const employeeId = req.params.employeeId;

    if (req.user.role === "employee" && req.user.id !== employeeId) {
      return res.status(403).json({ message: "Access denied" });
    }

    const types = await LeaveType.find({ status: "active" });
    const approved = await LeaveRequest.find({
      employee: employeeId,
      status: "Approved"
    }).populate("leaveType", "code");

    const balance = types.map(type => {
      const used = approved
        .filter(l => String(l.leaveType._id) === String(type._id))
        .reduce((sum, l) => sum + l.totalDays, 0);

      return {
        id: type._id,
        name: type.name,
        code: type.code,
        total: type.annualLimit,
        used,
        remaining: Math.max(type.annualLimit - used, 0)
      };
    });

    res.json(balance);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getLeaves,
  getLeave,
  createLeave,
  approveLeave,
  rejectLeave,
  getBalance
};