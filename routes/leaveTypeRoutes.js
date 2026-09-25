const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const { getLeaveTypes } = require("../controllers/leaveTypeController");

router.get("/", protect, getLeaveTypes);

module.exports = router;