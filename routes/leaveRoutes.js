const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const allowRoles = require("../middleware/roleMiddleware");
const {
  getLeaves,
  getLeave,
  createLeave,
  approveLeave,
  rejectLeave,
  getBalance
} = require("../controllers/leaveController");

router.get("/", protect, getLeaves);
router.post("/", protect, allowRoles("employee"), createLeave);
router.get("/balance/:employeeId", protect, getBalance);
router.get("/:id", protect, getLeave);
router.put("/:id/approve", protect, allowRoles("manager"), approveLeave);
router.put("/:id/reject", protect, allowRoles("manager"), rejectLeave);

module.exports = router;