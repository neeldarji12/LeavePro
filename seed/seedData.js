require("dotenv").config();
const bcrypt = require("bcryptjs");
const connectDB = require("../config/db");
const User = require("../models/User");
const Department = require("../models/Department");
const LeaveType = require("../models/LeaveType");
const LeaveRequest = require("../models/LeaveRequest");

const seed = async () => {
  await connectDB();

  await User.deleteMany({});
  await Department.deleteMany({});
  await LeaveType.deleteMany({});
  await LeaveRequest.deleteMany({});

  const departments = await Department.insertMany([
    { name: "Human Resources" },
    { name: "Information Technology" },
    { name: "Finance" },
    { name: "Sales" }
  ]);

  const types = await LeaveType.insertMany([
    { name: "Casual Leave", code: "CL", annualLimit: 7 },
    { name: "Sick Leave", code: "SL", annualLimit: 5 },
    { name: "Earned Leave", code: "EL", annualLimit: 10 },
    { name: "Privilege Leave", code: "PL", annualLimit: 5 }
  ]);

  const password = await bcrypt.hash("123456", 10);

  const manager = await User.create({
    name: "Manager",
    email: "manager@company.com",
    password,
    role: "manager",
    department: departments[0]._id
  });

  const employee = await User.create({
    name: "Employee",
    email: "employee@company.com",
    password,
    role: "employee",
    department: departments[1]._id
  });

  await LeaveRequest.create([
    {
      employee: employee._id,
      leaveType: types[0]._id,
      startDate: new Date("2026-09-22"),
      endDate: new Date("2026-09-23"),
      totalDays: 2,
      reason: "Personal work",
      status: "Pending"
    },
    {
      employee: employee._id,
      leaveType: types[1]._id,
      startDate: new Date("2026-08-10"),
      endDate: new Date("2026-08-10"),
      totalDays: 1,
      reason: "Not feeling well",
      status: "Approved",
      approvedBy: manager._id
    }
  ]);

  console.log("Seed data inserted");
  console.log("Manager: manager@company.com / 123456");
  console.log("Employee: employee@company.com / 123456");
  process.exit();
};

seed().catch(error => {
  console.error(error);
  process.exit(1);
});