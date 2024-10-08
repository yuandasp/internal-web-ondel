const express = require("express");
const router = express.Router();
const { authController } = require("../contollers/index");
const { verifyToken } = require("../middleware/authVerificationToken");
const { isSuperAdmin } = require("../middleware/role");

router.post("/login", authController.login);

module.exports = router;
