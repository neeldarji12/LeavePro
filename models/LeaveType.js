const mongoose = require("mongoose");

const leaveTypeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  code: { type: String, required: true, unique: true },
  annualLimit: { type: Number, required: true },
  status: { type: String, enum: ["active", "inactive"], default: "active" }
});

module.exports = mongoose.model("LeaveType", leaveTypeSchema);