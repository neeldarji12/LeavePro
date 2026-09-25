const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const { getDepartments } = require("../controllers/departmentController");

router.get("/", protect, getDepartments);

module.exports = router;