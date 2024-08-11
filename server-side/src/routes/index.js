const express = require("express");
const router = express.Router();
const { authController } = require("../contollers/index");
const { verifyToken } = require("../middleware/authVerification");

router.post("/login", authController.login);
router.post("/change-password", verifyToken, authController.changePassword);

module.exports = router;
