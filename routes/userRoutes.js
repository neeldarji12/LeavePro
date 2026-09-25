const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const { getUsers, getUser } = require("../controllers/userController");

router.get("/", protect, getUsers);
router.get("/:id", protect, getUser);

module.exports = router;